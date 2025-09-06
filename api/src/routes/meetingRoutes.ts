import { Router } from 'express';
import { MeetingController } from '../controllers/meetingController';

export function createMeetingRoutes(db: any): Router {
  const router = Router();
  const meetingController = new MeetingController(db);

  // GET /api/meetings - Get all meetings with optional filters
  router.get('/', meetingController.getAllMeetings);

  // GET /api/meetings/:id - Get meeting by ID
  router.get('/:id', meetingController.getMeetingById);

  // POST /api/meetings - Create new meeting
  router.post('/', meetingController.createMeeting);

  // PUT /api/meetings/:id - Update meeting
  router.put('/:id', meetingController.updateMeeting);

  // PATCH /api/meetings/:id/close - Close meeting
  router.patch('/:id/close', meetingController.closeMeeting);

  // DELETE /api/meetings/:id - Delete meeting
  router.delete('/:id', meetingController.deleteMeeting);

  return router;
}
