import { Request, Response } from 'express';
import WorkerService from '../services/workerService';

const workerService = new WorkerService();

export class WorkerController {

    static async classifyMeeting(req: Request, res: Response): Promise<void> {
        try {
            const { meetingId } = req.params;
            const { force_reprocess, callback_url } = req.body;

            if (!meetingId || isNaN(Number(meetingId))) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid meeting ID provided'
                });
                return;
            }

            const result = await workerService.classifyMeeting(
                Number(meetingId),
                { force_reprocess, callback_url }
            );

            res.status(200).json({
                success: true,
                message: 'Classification task queued successfully',
                data: {
                    task_id: result.taskId,
                    meeting_id: Number(meetingId),
                    status: 'queued'
                }
            });
        } catch (error: any) {
            console.error('Error in classifyMeeting:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to queue classification task'
            });
        }
    }

    static async classifyMeetingsBatch(req: Request, res: Response): Promise<void> {
        try {
            const { meeting_ids, force_reprocess } = req.body;

            if (!Array.isArray(meeting_ids) || meeting_ids.length === 0) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid meeting_ids array provided'
                });
                return;
            }

            // Validate all IDs are numbers
            const validIds = meeting_ids.filter(id => !isNaN(Number(id)));
            if (validIds.length !== meeting_ids.length) {
                res.status(400).json({
                    success: false,
                    error: 'All meeting IDs must be valid numbers'
                });
                return;
            }

            const result = await workerService.classifyMeetingsBatch(
                validIds.map(Number),
                force_reprocess || false
            );

            res.status(200).json({
                success: true,
                message: `Batch classification queued for ${validIds.length} meetings`,
                data: {
                    batch_task_id: result.taskId,
                    queued_tasks: result.queuedTasks,
                    meeting_ids: validIds,
                    total_queued: result.queuedTasks.length
                }
            });
        } catch (error: any) {
            console.error('Error in classifyMeetingsBatch:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to queue batch classification'
            });
        }
    }

    /**
     * Get task status and result
     */
    static async getTaskStatus(req: Request, res: Response): Promise<void> {
        try {
            const { taskId } = req.params;

            if (!taskId) {
                res.status(400).json({
                    success: false,
                    error: 'Task ID is required'
                });
                return;
            }

            const status = await workerService.getTaskStatus(taskId);

            res.status(200).json({
                success: true,
                message: 'Task status retrieved successfully',
                data: status
            });
        } catch (error: any) {
            console.error('Error in getTaskStatus:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to get task status'
            });
        }
    }

    /**
     * Get worker system statistics
     */
    static async getWorkerStats(req: Request, res: Response): Promise<void> {
        try {
            const stats = await workerService.getWorkerStats();

            res.status(200).json({
                success: true,
                message: 'Worker statistics retrieved successfully',
                data: stats
            });
        } catch (error: any) {
            console.error('Error in getWorkerStats:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to get worker statistics'
            });
        }
    }

    /**
     * Health check for worker system
     */
    static async workerHealthCheck(req: Request, res: Response): Promise<void> {
        try {
            const health = await workerService.healthCheck();

            const statusCode = health.healthy ? 200 : 503;
            res.status(statusCode).json({
                success: health.healthy,
                message: health.message,
                data: {
                    healthy: health.healthy,
                    redis_connected: health.redis,
                    timestamp: new Date().toISOString()
                }
            });
        } catch (error: any) {
            console.error('Error in workerHealthCheck:', error);
            res.status(503).json({
                success: false,
                error: error.message as string || 'Worker health check failed',
                data: {
                    healthy: false,
                    redis_connected: false,
                    timestamp: new Date().toISOString()
                }
            });
        }
    }

    /**
     * Clean up old completed tasks
     */
    static async cleanupOldTasks(req: Request, res: Response): Promise<void> {
        try {
            const { days } = req.query;
            const olderThanDays = days ? Number(days) : 7;

            if (isNaN(olderThanDays) || olderThanDays < 1) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid days parameter. Must be a positive number.'
                });
                return;
            }

            const result = await workerService.cleanupOldTasks(olderThanDays);

            res.status(200).json({
                success: true,
                message: `Cleaned up ${result.cleaned} old task records`,
                data: {
                    cleaned_tasks: result.cleaned,
                    older_than_days: olderThanDays
                }
            });
        } catch (error: any) {
            console.error('Error in cleanupOldTasks:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to cleanup old tasks'
            });
        }
    }

    /**
     * Get classification result for a specific meeting
     */
    static async getClassificationResult(req: Request, res: Response): Promise<void> {
        try {
            const { meetingId } = req.params;

            if (!meetingId || isNaN(Number(meetingId))) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid meeting ID provided'
                });
                return;
            }

            const result = await workerService.getClassificationResult(Number(meetingId));

            if (!result) {
                res.status(404).json({
                    success: false,
                    message: 'Classification result not found for this meeting'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Classification result retrieved successfully',
                data: {
                    meeting_id: Number(meetingId),
                    classification: result
                }
            });
        } catch (error: any) {
            console.error('Error in getClassificationResult:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to get classification result'
            });
        }
    }

    /**
     * Get all classification results
     */
    static async getAllClassificationResults(req: Request, res: Response): Promise<void> {
        try {
            const results = await workerService.getAllClassificationResults();

            res.status(200).json({
                success: true,
                message: 'All classification results retrieved successfully',
                data: {
                    results,
                    total_count: results.length
                }
            });
        } catch (error: any) {
            console.error('Error in getAllClassificationResults:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to get classification results'
            });
        }
    }

    /**
     * Delete classification result for a meeting
     */
    static async deleteClassificationResult(req: Request, res: Response): Promise<void> {
        try {
            const { meetingId } = req.params;

            if (!meetingId || isNaN(Number(meetingId))) {
                res.status(400).json({
                    success: false,
                    error: 'Invalid meeting ID provided'
                });
                return;
            }

            const deleted = await workerService.deleteClassificationResult(Number(meetingId));

            if (!deleted) {
                res.status(404).json({
                    success: false,
                    message: 'Classification result not found for this meeting'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Classification result deleted successfully',
                data: {
                    meeting_id: Number(meetingId),
                    deleted: true
                }
            });
        } catch (error: any) {
            console.error('Error in deleteClassificationResult:', error);
            res.status(500).json({
                success: false,
                error: error.message as string || 'Failed to delete classification result'
            });
        }
    }
}
