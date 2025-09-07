import db from '../db/models';
import { Op } from 'sequelize';
import { MeetingClassification, MeetingClassificationAttributes, MeetingClassificationCreationAttributes } from '../db/models/MeetingClassification';

interface ClassificationData {
  meeting_id: number;
  categories: string[];
  confidence_score: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  key_topics: string[];
  action_items: string[];
  next_steps?: string;
  summary?: string;
  model_used: string;
  processed_at: Date;
  processing_time_ms?: number;
}

export class ClassificationService {
  private MeetingClassification: typeof MeetingClassification;

  constructor() {
    this.MeetingClassification = db.MeetingClassification;
  }

  /**
   * Queue all unclassified meetings for classification
   */
  async queueUnclassifiedMeetings(): Promise<{ queued: number; total: number }> {
    try {
      console.log('Checking for unclassified meetings...');

      // Get all meeting IDs that don't have classifications
      const classifiedMeetingIds = await this.MeetingClassification.findAll({
        attributes: ['meeting_id']
      }).then(classifications => classifications.map(c => c.meeting_id));

      // Get all meetings that don't have classifications
      const unclassifiedMeetings = await db.Meeting.findAll({
        where: {
          id: {
            [Op.notIn]: classifiedMeetingIds
          }
        },
        include: [
          {
            model: db.Client,
            as: 'client',
            attributes: ['name', 'email']
          },
          {
            model: db.Seller,
            as: 'seller',
            attributes: ['name', 'email']
          }
        ],
        attributes: ['id', 'client_id', 'seller_id', 'meeting_at', 'transcript', 'closed'],
        order: [['created_at', 'ASC']]
      });

      if (unclassifiedMeetings.length === 0) {
        console.log('No unclassified meetings found');
        return { queued: 0, total: 0 };
      }

      console.log(`Found ${unclassifiedMeetings.length} unclassified meetings`);

      // For now, we'll just log the meetings that would be queued
      // In a real implementation, this would enqueue them to Redis/Celery
      console.log('Meetings to be classified:');
      unclassifiedMeetings.forEach(meeting => {
        const clientName = meeting.get('client')?.get('name') || 'Unknown Client';
        const sellerName = meeting.get('seller')?.get('name') || 'Unknown Seller';
        console.log(`- Meeting ${meeting.id}: ${clientName} with ${sellerName} on ${meeting.meeting_at}`);
      });

      return {
        queued: unclassifiedMeetings.length,
        total: unclassifiedMeetings.length
      };

    } catch (error) {
      console.error('Error queuing unclassified meetings:', error);
      throw error;
    }
  }

  /**
   * Save classification result to database
   */
  async saveClassification(classificationData: ClassificationData): Promise<void> {
    try {
      // Check if classification already exists
      const existing = await this.MeetingClassification.findOne({
        where: { meeting_id: classificationData.meeting_id }
      });

      const data: MeetingClassificationCreationAttributes = {
        meeting_id: classificationData.meeting_id,
        categories: classificationData.categories,
        confidence_score: classificationData.confidence_score,
        sentiment: classificationData.sentiment,
        key_topics: classificationData.key_topics,
        action_items: classificationData.action_items,
        next_steps: classificationData.next_steps,
        summary: classificationData.summary,
        model_used: classificationData.model_used,
        processed_at: classificationData.processed_at,
        processing_time_ms: classificationData.processing_time_ms
      };

      if (existing) {
        // Update existing classification
        await existing.update(data);
      } else {
        // Create new classification
        await this.MeetingClassification.create(data);
      }

      console.log(`Classification saved for meeting ${classificationData.meeting_id}`);

    } catch (error) {
      console.error('Error saving classification:', error);
      throw error;
    }
  }

  /**
   * Get classification for a meeting
   */
  async getClassification(meetingId: number): Promise<any> {
    try {
      const classification = await this.MeetingClassification.findOne({
        where: { meeting_id: meetingId }
      });

      if (!classification) {
        return null;
      }

      // Return the classification data
      return classification.toJSON();

    } catch (error) {
      console.error('Error getting classification:', error);
      throw error;
    }
  }

  /**
   * Get all classifications
   */
  async getAllClassifications(): Promise<any[]> {
    try {
      const classifications = await this.MeetingClassification.findAll({
        include: [
          {
            model: db.Meeting,
            as: 'meeting',
            attributes: ['meeting_at'],
            include: [
              {
                model: db.Client,
                as: 'client',
                attributes: ['name']
              },
              {
                model: db.Seller,
                as: 'seller',
                attributes: ['name']
              }
            ]
          }
        ],
        order: [['processed_at', 'DESC']]
      });

      return classifications.map(classification => {
        const data = classification.toJSON() as any;

        return {
          ...data,
          client_name: data.meeting?.client?.name,
          seller_name: data.meeting?.seller?.name,
          meeting_at: data.meeting?.meeting_at,
          meeting: undefined
        };
      });

    } catch (error) {
      console.error('Error getting all classifications:', error);
      throw error;
    }
  }
}
