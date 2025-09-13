import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { MeetingClassification } from "../../database/models/meeting-classification.model";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";
import { Op } from "sequelize";

interface ClassificationData {
  meeting_id: number;
  categories: string[];
  confidence_score: number;
  sentiment: "positive" | "neutral" | "negative";
  key_topics: string[];
  action_items: string[];
  next_steps?: string;
  summary?: string;
  model_used: string;
  processed_at: Date;
  processing_time_ms?: number;
}

@Injectable()
export class ClassificationsService {
  constructor(
    @InjectModel(MeetingClassification)
    private meetingClassificationModel: typeof MeetingClassification,
    @InjectModel(Meeting)
    private meetingModel: typeof Meeting,
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
  ) {}

  async queueUnclassifiedMeetings(): Promise<{
    queued: number;
    total: number;
  }> {
    try {
      console.log("Checking for unclassified meetings...");

      const classifiedMeetingIds = await this.meetingClassificationModel
        .findAll({
          attributes: ["meeting_id"],
        })
        .then((classifications) => classifications.map((c) => c.meeting_id));

      const unclassifiedMeetings = await this.meetingModel.findAll({
        where: {
          id: {
            [Op.notIn]: classifiedMeetingIds,
          },
        },
        include: [
          {
            model: this.clientModel,
            as: "client",
            attributes: ["name", "email"],
          },
          {
            model: this.sellerModel,
            as: "seller",
            attributes: ["name", "email"],
          },
        ],
        attributes: [
          "id",
          "client_id",
          "seller_id",
          "meeting_at",
          "transcript",
          "closed",
        ],
        order: [["created_at", "ASC"]],
      });

      if (unclassifiedMeetings.length === 0) {
        console.log("No unclassified meetings found");
        return { queued: 0, total: 0 };
      }

      console.log(`Found ${unclassifiedMeetings.length} unclassified meetings`);

      console.log("Meetings to be classified:");
      unclassifiedMeetings.forEach((meeting) => {
        const clientName =
          meeting.get("client")?.get("name") || "Unknown Client";
        const sellerName =
          meeting.get("seller")?.get("name") || "Unknown Seller";
        console.log(
          `- Meeting ${meeting.id}: ${clientName} with ${sellerName} on ${meeting.meeting_at}`,
        );
      });

      return {
        queued: unclassifiedMeetings.length,
        total: unclassifiedMeetings.length,
      };
    } catch (error) {
      console.error("Error queuing unclassified meetings:", error);
      throw error;
    }
  }

  async saveClassification(
    classificationData: ClassificationData,
  ): Promise<void> {
    try {
      const existing = await this.meetingClassificationModel.findOne({
        where: { meeting_id: classificationData.meeting_id },
      });

      const data = {
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
        processing_time_ms: classificationData.processing_time_ms,
      };

      if (existing) {
        await existing.update(data);
      } else {
        await this.meetingClassificationModel.create(data);
      }

      console.log(
        `Classification saved for meeting ${classificationData.meeting_id}`,
      );
    } catch (error) {
      console.error("Error saving classification:", error);
      throw error;
    }
  }

  async getClassification(meetingId: number): Promise<any> {
    try {
      const classification = await this.meetingClassificationModel.findOne({
        where: { meeting_id: meetingId },
      });

      if (!classification) {
        return null;
      }

      return classification.toJSON();
    } catch (error) {
      console.error("Error getting classification:", error);
      throw error;
    }
  }

  async getAllClassifications(): Promise<any[]> {
    try {
      const classifications = await this.meetingClassificationModel.findAll({
        include: [
          {
            model: this.meetingModel,
            as: "meeting",
            attributes: ["meeting_at"],
            include: [
              {
                model: this.clientModel,
                as: "client",
                attributes: ["name"],
              },
              {
                model: this.sellerModel,
                as: "seller",
                attributes: ["name"],
              },
            ],
          },
        ],
        order: [["processed_at", "DESC"]],
      });

      return classifications.map((classification) => {
        const data = classification.toJSON() as any;

        return {
          ...data,
          client_name: data.meeting?.client?.name,
          seller_name: data.meeting?.seller?.name,
          meeting_at: data.meeting?.meeting_at,
          meeting: undefined,
        };
      });
    } catch (error) {
      console.error("Error getting all classifications:", error);
      throw error;
    }
  }
}
