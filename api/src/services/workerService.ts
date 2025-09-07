import Redis from 'ioredis';

interface ClassificationTask {
    meeting_id: number;
    force_reprocess?: boolean;
    callback_url?: string;
}

interface TaskResult {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
    task_id?: string;
    processing_time_ms?: number;
}

interface TaskStatus {
    task_id: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    result?: any;
    meta?: any;
    error?: string;
}

class WorkerService {
    private redis: Redis;
    private redisUrl: string;

    constructor() {
        this.redisUrl = process.env.REDIS_URL || 'redis://localhost:6379/0';
        this.redis = new Redis(this.redisUrl);
    }

    async classifyMeeting(meetingId: number, options: Partial<ClassificationTask> = {}): Promise<{ taskId: string }> {
        try {
            const taskData = {
                meeting_id: meetingId,
                force_reprocess: options.force_reprocess || false,
                callback_url: options.callback_url || null
            };

            const taskId = `classify_meeting_${meetingId}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            
            // Simple format that Celery can understand
            const taskMessage = {
                id: taskId,
                task: 'classify_meeting',
                args: [meetingId, taskData.force_reprocess || false, taskData.callback_url || null],
                kwargs: {},
                retries: 0,
                eta: null,
                expires: null
            };

            await this.redis.lpush('celery', JSON.stringify(taskMessage));
            
            await this.redis.hset(`celery-task-meta-${taskId}`, {
                status: 'PENDING',
                result: null,
                traceback: null,
                children: null,
                date_done: null,
                task_id: taskId
            });

            console.log(`Queued classification task for meeting ${meetingId} with task ID: ${taskId}`);
            
            return { taskId };
        } catch (error: any) {
            console.error('Error queuing classification task:', error);
            throw new Error(`Failed to queue classification task: ${error.message as string}`);
        }
    }

    async classifyMeetingsBatch(meetingIds: number[], forceReprocess: boolean = false): Promise<{ taskId: string; queuedTasks: string[] }> {
        try {
            const batchTaskId = `batch_classify_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            const queuedTasks: string[] = [];

            for (const meetingId of meetingIds) {
                const { taskId } = await this.classifyMeeting(meetingId, { force_reprocess: forceReprocess });
                queuedTasks.push(taskId);
            }

            console.log(`Queued batch classification for ${meetingIds.length} meetings`);
            
            return { taskId: batchTaskId, queuedTasks };
        } catch (error: any) {
            console.error('Error queuing batch classification:', error);
            throw new Error(`Failed to queue batch classification: ${error.message as string}`);
        }
    }

    async getTaskStatus(taskId: string): Promise<TaskStatus> {
        try {
            const taskData = await this.redis.hgetall(`celery-task-meta-${taskId}`);
            
            if (!taskData || Object.keys(taskData).length === 0) {
                return {
                    task_id: taskId,
                    status: 'pending',
                    meta: { message: 'Task not found or still queued' }
                };
            }

            let result = null;
            if (taskData.result && taskData.result !== 'null') {
                try {
                    result = JSON.parse(taskData.result);
                } catch {
                    result = taskData.result as any;
                }
            }

            return {
                task_id: taskId,
                status: taskData.status?.toLowerCase() as any || 'pending',
                result,
                meta: taskData.meta ? JSON.parse(taskData.meta) : null,
                error: taskData.traceback
            };
        } catch (error: any) {
            console.error('Error getting task status:', error);
            throw new Error(`Failed to get task status: ${error.message as string}`);
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
            console.error('Error getting classification result:', error);
            throw new Error(`Failed to get classification result: ${error.message as string}`);
        }
    }

    async getAllClassificationResults(): Promise<any[]> {
        try {
            const resultKeys = await this.redis.keys('classification_result:*');
            const results = [] as any[];

            for (const key of resultKeys) {
                const result = await this.redis.get(key);
                if (result) {
                    const meetingId = key.replace('classification_result:', '');
                    results.push({
                        meeting_id: parseInt(meetingId),
                        classification: JSON.parse(result)
                    });
                }
            }

            return results;
        } catch (error: any) {
            console.error('Error getting all classification results:', error);
            throw new Error(`Failed to get classification results: ${error.message as string}`);
        }
    }

    async deleteClassificationResult(meetingId: number): Promise<boolean> {
        try {
            const resultKey = `classification_result:${meetingId}`;
            const deleted = await this.redis.del(resultKey);
            return deleted > 0;
        } catch (error: any) {
            console.error('Error deleting classification result:', error);
            throw new Error(`Failed to delete classification result: ${error.message as string}`);
        }
    }

    async getWorkerStats(): Promise<any> {
        try {
            const queueLength = await this.redis.llen('celery');
            
            const taskKeys = await this.redis.keys('celery-task-meta-*');
            
            const statusCounts = { pending: 0, processing: 0, completed: 0, failed: 0 };
            
            for (const key of taskKeys.slice(0, 100)) { 
                const status = await this.redis.hget(key, 'status');
                if (status) {
                    const normalizedStatus = status.toLowerCase();
                    if (normalizedStatus === 'success') {
                        statusCounts.completed++;
                    } else if (normalizedStatus === 'failure') {
                        statusCounts.failed++;
                    } else if (normalizedStatus === 'started') {
                        statusCounts.processing++;
                    } else {
                        statusCounts.pending++;
                    }
                }
            }

            return {
                queue_length: queueLength,
                total_tasks: taskKeys.length,
                task_counts: statusCounts,
                redis_connected: true
            };
        } catch (error: any) {
            console.error('Error getting worker stats:', error);
            return {
                queue_length: 0,
                total_tasks: 0,
                task_counts: { pending: 0, processing: 0, completed: 0, failed: 0 },
                redis_connected: false,
                error: error.message as string
            };
        }
    }

    async healthCheck(): Promise<{ healthy: boolean; redis: boolean; message: string }> {
        try {
            await this.redis.ping();

            const queueLength = await this.redis.llen('celery');

            return {
                healthy: true,
                redis: true,
                message: `Worker system is healthy. Queue length: ${queueLength}`
            };
        } catch (error: any) {
            return {
                healthy: false,
                redis: false,
                message: `Worker system unhealthy: ${error.message as string}`
            };
        }
    }

    async cleanupOldTasks(olderThanDays: number = 7): Promise<{ cleaned: number }> {
        try {
            const cutoffTime = Date.now() - (olderThanDays * 24 * 60 * 60 * 1000);
            const taskKeys = await this.redis.keys('celery-task-meta-*');
            let cleaned = 0;

            for (const key of taskKeys) {
                const dateField = await this.redis.hget(key, 'date_done');
                if (dateField) {
                    const taskDate = new Date(dateField).getTime();
                    if (taskDate < cutoffTime) {
                        await this.redis.del(key);
                        cleaned++;
                    }
                }
            }

            console.log(`Cleaned up ${cleaned} old task records`);
            return { cleaned };
        } catch (error: any) {
            console.error('Error cleaning up old tasks:', error);
            throw new Error(`Failed to cleanup old tasks: ${error.message as string}`);
        }
    }

    async disconnect(): Promise<void> {
        await this.redis.disconnect();
    }
}

export default WorkerService;
