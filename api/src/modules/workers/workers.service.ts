import { Injectable, OnModuleDestroy } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import Redis from "ioredis";
import * as Celery from "celery-ts";
import { randomUUID } from "crypto";

interface TaskStatus {
  task_id: string;
  status: "pending" | "processing" | "completed" | "failed";
  result?: any;
  meta?: any;
  error?: string;
}

@Injectable()
export class WorkersService implements OnModuleDestroy {
  private redis: Redis;
  private redisUrl: string;
  private celeryClient: Celery.Client;
  private classifyTask: Celery.Task<any>;

  constructor(private configService: ConfigService) {
    try {
      const redisConfig = this.configService.get("redis");
      const workersConfig = this.configService.get("workers");

      const redisUrl = `redis://${redisConfig.host}:${redisConfig.port}/0`;
      this.redisUrl = redisUrl;
      this.redis = new Redis(redisUrl, {
        maxRetriesPerRequest: 3,
        lazyConnect: true,
      });

      this.celeryClient = Celery.createClient({
        brokerUrl: redisUrl,
        resultBackend: redisUrl.replace("/0", "/1"),
      });

      this.classifyTask = this.celeryClient.createTask<any>("classify_meeting");

      console.log(
        `🔧 Workers configured with queue: ${workersConfig.queueName}`,
      );
    } catch (error) {
      console.error("❌ Error initializing WorkersService:", error);
      this.redis = null as any;
      this.celeryClient = null as any;
      this.classifyTask = null as any;
    }
  }

  async onModuleDestroy() {
    if (this.redis) {
      this.redis.disconnect();
    }
  }

  async classifyMeeting(
    meetingId: number,
    options: { force_reprocess?: boolean; callback_url?: string } = {},
  ): Promise<{ taskId: string }> {
    try {
      const force = !!options.force_reprocess;
      const callbackUrl = options.callback_url ?? null;

      const taskId = randomUUID();

      this.classifyTask.applyAsync({
        args: [meetingId, force, callbackUrl],
        kwargs: {},
      });

      console.log(
        `Queued classification task for meeting ${meetingId} with task ID: ${taskId}`,
      );
      return { taskId };
    } catch (err: any) {
      console.error("Error queuing classification task:", err);
      throw new Error(`Failed to queue classification task: ${err.message}`);
    }
  }

  async classifyMeetingsBatch(
    meetingIds: number[],
    forceReprocess: boolean = false,
  ): Promise<{ taskId: string; queuedTasks: string[] }> {
    try {
      const batchTaskId = `batch_classify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const queuedTasks: string[] = [];

      for (const meetingId of meetingIds) {
        const { taskId } = await this.classifyMeeting(meetingId, {
          force_reprocess: forceReprocess,
        });
        queuedTasks.push(taskId);
      }

      console.log(
        `Queued batch classification for ${meetingIds.length} meetings`,
      );

      return { taskId: batchTaskId, queuedTasks };
    } catch (error: any) {
      console.error("Error queuing batch classification:", error);
      throw new Error(`Failed to queue batch classification: ${error.message}`);
    }
  }

  async getTaskStatus(taskId: string): Promise<TaskStatus> {
    try {
      const taskDataString = await this.redis.get(`celery-task-meta-${taskId}`);

      if (!taskDataString) {
        return {
          task_id: taskId,
          status: "pending",
          meta: { message: "Task not found or still queued" },
        };
      }

      const taskData = JSON.parse(taskDataString);

      let result = null;
      if (taskData.result && taskData.result !== "null") {
        try {
          result = JSON.parse(taskData.result);
        } catch {
          result = taskData.result as any;
        }
      }

      // Normalize Celery status to our interface
      let normalizedStatus =
        (taskData.status?.toLowerCase() as any) || "pending";
      if (normalizedStatus === "success") {
        normalizedStatus = "completed";
      } else if (normalizedStatus === "failure") {
        normalizedStatus = "failed";
      } else if (
        normalizedStatus === "started" ||
        normalizedStatus === "progress"
      ) {
        normalizedStatus = "processing";
      }

      return {
        task_id: taskId,
        status: normalizedStatus,
        result,
        meta: taskData.meta ? JSON.parse(taskData.meta) : null,
        error: taskData.traceback,
      };
    } catch (error: any) {
      console.error("❌ Error getting task status:", error);
      throw new Error(`Failed to get task status: ${error.message}`);
    }
  }

  async getClassificationResult(meetingId: number): Promise<any> {
    try {
      const resultKey = `classification_result:${meetingId}`;
      const result = await this.redis.get(resultKey);

      if (!result) {
        return null;
      }

      return JSON.parse(result);
    } catch (error: any) {
      console.error("Error getting classification result:", error);
      throw new Error(`Failed to get classification result: ${error.message}`);
    }
  }

  async getAllClassificationResults(): Promise<any[]> {
    try {
      const resultKeys = await this.redis.keys("classification_result:*");
      const results = [] as any[];

      for (const key of resultKeys) {
        const result = await this.redis.get(key);
        if (result) {
          const meetingId = key.replace("classification_result:", "");
          results.push({
            meeting_id: parseInt(meetingId),
            classification: JSON.parse(result),
          });
        }
      }

      return results;
    } catch (error: any) {
      console.error("Error getting all classification results:", error);
      throw new Error(`Failed to get classification results: ${error.message}`);
    }
  }

  async deleteClassificationResult(meetingId: number): Promise<boolean> {
    try {
      const resultKey = `classification_result:${meetingId}`;
      const deleted = await this.redis.del(resultKey);
      return deleted > 0;
    } catch (error: any) {
      console.error("Error deleting classification result:", error);
      throw new Error(
        `Failed to delete classification result: ${error.message}`,
      );
    }
  }

  async getWorkerStats(): Promise<any> {
    try {
      if (!this.redis) {
        return {
          queue_length: 0,
          total_tasks: 0,
          sampled_tasks: 0,
          task_counts: { pending: 0, processing: 0, completed: 0, failed: 0 },
          recent_tasks_24h: 0,
          redis_connected: false,
          error: "Redis not initialized",
          timestamp: new Date().toISOString(),
        };
      }

      await this.redis.ping();

      const taskKeys = await this.redis.keys("celery-task-meta-*");

      const statusCounts = {
        pending: 0,
        processing: 0,
        completed: 0,
        failed: 0,
      };

      const sampleSize = Math.min(taskKeys.length, 1000);
      const sampleKeys = taskKeys.slice(0, sampleSize);

      for (const key of sampleKeys) {
        const taskDataString = await this.redis.get(key);
        if (taskDataString) {
          try {
            const taskData = JSON.parse(taskDataString);
            const status = taskData.status;
            if (status) {
              const normalizedStatus = status.toLowerCase();
              if (normalizedStatus === "success") {
                statusCounts.completed++;
              } else if (normalizedStatus === "failure") {
                statusCounts.failed++;
              } else if (
                normalizedStatus === "started" ||
                normalizedStatus === "progress"
              ) {
                statusCounts.processing++;
              } else {
                statusCounts.pending++;
              }
            }
          } catch (parseError) {
            console.warn(
              `Failed to parse task data for key ${key}:`,
              parseError,
            );
          }
        }
      }

      const recentTasks = await this.getRecentTasks(24);

      return {
        queue_length: 0,
        total_tasks: taskKeys.length,
        sampled_tasks: sampleSize,
        task_counts: statusCounts,
        recent_tasks_24h: recentTasks.length,
        redis_connected: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("❌ Error getting worker stats:", error);
      return {
        queue_length: 0,
        total_tasks: 0,
        sampled_tasks: 0,
        task_counts: { pending: 0, processing: 0, completed: 0, failed: 0 },
        recent_tasks_24h: 0,
        redis_connected: false,
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getRecentTasks(hours: number = 24): Promise<any[]> {
    try {
      const cutoffTime = Date.now() - hours * 60 * 60 * 1000;
      const taskKeys = await this.redis.keys("celery-task-meta-*");
      const recentTasks: any[] = [];

      for (const key of taskKeys.slice(0, 500)) {
        const taskDataString = await this.redis.get(key);
        if (taskDataString) {
          try {
            const taskData = JSON.parse(taskDataString);
            if (taskData.date_done) {
              const taskDate = new Date(taskData.date_done).getTime();
              if (taskDate > cutoffTime) {
                recentTasks.push({
                  task_id: taskData.task_id,
                  status: taskData.status,
                  date_done: taskData.date_done,
                });
              }
            }
          } catch (parseError) {
            console.warn(
              `Failed to parse task data for key ${key}:`,
              parseError,
            );
          }
        }
      }

      return recentTasks.sort(
        (a, b) =>
          new Date(b.date_done).getTime() - new Date(a.date_done).getTime(),
      );
    } catch (error: any) {
      console.error("❌ Error getting recent tasks:", error);
      return [];
    }
  }

  async healthCheck(): Promise<{
    healthy: boolean;
    redis: boolean;
    message: string;
  }> {
    try {
      await this.redis.ping();

      const taskKeys = await this.redis.keys("celery-task-meta-*");
      const totalTasks = taskKeys.length;

      return {
        healthy: true,
        redis: true,
        message: `Worker system is healthy. Total tasks processed: ${totalTasks}`,
      };
    } catch (error: any) {
      return {
        healthy: false,
        redis: false,
        message: `Worker system unhealthy: ${error.message}`,
      };
    }
  }
}
