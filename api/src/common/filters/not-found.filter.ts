import {
  ExceptionFilter,
  Catch,
  NotFoundException,
  ArgumentsHost,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const message = exception.message || "Resource not found";

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: message,
      error: "Not Found",
    });
  }
}
