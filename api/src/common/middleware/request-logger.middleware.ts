import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger("RequestLogger");

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, headers } = req;
    const userAgent = headers["user-agent"] || "";
    const startTime = Date.now();

    this.logger.log(`📥 ${method} ${originalUrl} - ${ip} - ${userAgent}`);

    const originalEnd = res.end.bind(res);
    res.end = function (chunk?: any, encoding?: any, cb?: any) {
      const duration = Date.now() - startTime;
      const { statusCode } = res;

      const contentLength = res.get("content-length") || "0";

      let statusInfo = "";
      if (statusCode >= 200 && statusCode < 300) {
        statusInfo = `✅ ${statusCode}`;
      } else if (statusCode >= 300 && statusCode < 400) {
        statusInfo = `🔄 ${statusCode}`;
      } else if (statusCode >= 400 && statusCode < 500) {
        statusInfo = `❌ ${statusCode}`;
      } else if (statusCode >= 500) {
        statusInfo = `💥 ${statusCode}`;
      }

      console.log(
        `📤 ${method} ${originalUrl} ${statusInfo} - ${duration}ms - ${contentLength} bytes`,
      );

      return originalEnd(chunk, encoding, cb);
    };

    next();
  }
}
