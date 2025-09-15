import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MeetingClassification } from '../../../database/models/meeting-classification.model';
import { WorkersService } from '../../workers/workers.service';

export interface QueueResult {
  queued: number;
  skipped: number;
  errors: number;
}

@Injectable()
export class ClassificationQueueService {
  constructor(
    @InjectModel(MeetingClassification)
    private meetingClassificationModel: typeof MeetingClassification,
    private workersService: WorkersService,
  ) {}

  async queueClassificationsForMeetings(meetingIds: number[]): Promise<QueueResult> {
    const result: QueueResult = {
      queued: 0,
      skipped: 0,
      errors: 0,
    };

    console.log(`🔄 Processing ${meetingIds.length} meetings for classification...`);

    for (const meetingId of meetingIds) {
      try {
        const existingClassification = await this.meetingClassificationModel.findOne({
          where: { meeting_id: meetingId },
        });

        if (!existingClassification) {
          console.log(`🔄 Queuing classification for meeting ${meetingId}...`);
          await this.workersService.classifyMeeting(meetingId);
          result.queued++;
        } else {
          console.log(`✅ Meeting ${meetingId} already has a classification`);
          result.skipped++;
        }
      } catch (error: any) {
        console.error(`❌ Error queuing classification for meeting ${meetingId}:`, error.message);
        result.errors++;
      }
    }

    console.log(`📊 Classification queue results:`);
    console.log(`- Queued: ${result.queued}`);
    console.log(`- Skipped: ${result.skipped}`);
    console.log(`- Errors: ${result.errors}`);

    return result;
  }
}
