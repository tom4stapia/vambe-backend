import { registerAs } from "@nestjs/config";

export default registerAs("workers", () => ({
  queueName: process.env.QUEUE_NAME || "classification",
  concurrency: parseInt(process.env.WORKER_CONCURRENCY, 10) || 1,
  taskTimeout: parseInt(process.env.TASK_TIMEOUT, 10) || 300000,
  maxRetries: parseInt(process.env.MAX_RETRIES, 10) || 3,
}));
