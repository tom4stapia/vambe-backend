import { registerAs } from "@nestjs/config";

export default registerAs("app", () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  apiPrefix: "api/v1",
  jwtSecret: process.env.JWT_SECRET || "your-secret-key-change-in-production",
  superAdminEmail: process.env.SUPER_ADMIN_EMAIL || "admin@vambe.ai",
  superAdminPassword: process.env.SUPER_ADMIN_PASSWORD || "contrasena superadmin",
  superAdminName: process.env.SUPER_ADMIN_NAME || "superadmin",
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  },
}));
