import { Router } from 'express';
import { WorkerController } from '../controllers/workerController';

const router = Router();

router.post('/classify/:meetingId', WorkerController.classifyMeeting);
router.post('/classify/batch', WorkerController.classifyMeetingsBatch);

router.get('/task/:taskId', WorkerController.getTaskStatus);
router.get('/stats', WorkerController.getWorkerStats);
router.get('/health', WorkerController.workerHealthCheck);

router.get('/results/:meetingId', WorkerController.getClassificationResult);
router.get('/results', WorkerController.getAllClassificationResults);
router.delete('/results/:meetingId', WorkerController.deleteClassificationResult);

router.post('/cleanup', WorkerController.cleanupOldTasks);

export default router;
