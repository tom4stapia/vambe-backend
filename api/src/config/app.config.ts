import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: "api/v1",
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
}));
