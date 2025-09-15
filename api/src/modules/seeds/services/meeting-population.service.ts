import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meeting } from '../../../database/models/meeting.model';
import { Client } from '../../../database/models/client.model';
import { Seller } from '../../../database/models/seller.model';

export interface MeetingPopulationResult {
  inserted: number;
  skipped: number;
  insertedMeetingIds: number[];
}

@Injectable()
export class MeetingPopulationService {
  constructor(
    @InjectModel(Meeting)
    private meetingModel: typeof Meeting,
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
  ) {}

  async populateMeetings(csvData: any[]): Promise<MeetingPopulationResult> {
    console.log('📅 Populating meetings...');
    const results: MeetingPopulationResult = {
      inserted: 0,
      skipped: 0,
      insertedMeetingIds: [],
    };

    for (const row of csvData) {
      try {
        const client = await this.clientModel.findOne({
          where: { email: row['Correo Electronico'] },
        });
        const seller = await this.sellerModel.findOne({
          where: { name: row['Vendedor asignado'] },
        });

        if (client && seller) {
          const existingMeeting = await this.meetingModel.findOne({
            where: {
              client_id: client.id,
              seller_id: seller.id,
              meeting_at: new Date(row['Fecha de la Reunion']),
            },
          });

          if (existingMeeting) {
            results.skipped++;
            results.insertedMeetingIds.push(existingMeeting.id);
          } else {
            const meeting = await this.meetingModel.create({
              client_id: client.id,
              seller_id: seller.id,
              meeting_at: new Date(row['Fecha de la Reunion']),
              closed: row['closed'] === '1',
              transcript: row['Transcripcion'],
            });
            results.inserted++;
            results.insertedMeetingIds.push(meeting.id);
          }
        } else {
          results.skipped++;
        }
      } catch (error: any) {
        console.log(
          `⚠️  Error processing meeting for ${row['Correo Electronico']}: ${error.message}`,
        );
        results.skipped++;
      }
    }

    return results;
  }
}
