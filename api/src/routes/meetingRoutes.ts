import { Router } from 'express';
import { MeetingController } from '../controllers/meetingController';

export function createMeetingRoutes(db: any): Router {
  const router = Router();
  const meetingController = new MeetingController(db);

  router.get('/', meetingController.getAllMeetings);

  router.get('/:id', meetingController.getMeetingById);

  router.post('/', meetingController.createMeeting);

  router.put('/:id', meetingController.updateMeeting);

  router.patch('/:id/close', meetingController.closeMeeting);

  router.delete('/:id', meetingController.deleteMeeting);

  return router;
}
