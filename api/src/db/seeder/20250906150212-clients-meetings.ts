import * as path from 'path';
import { QueryInterface, Sequelize } from 'sequelize';
import { DataPopulationService } from '../services/dataPopulationService';
import WorkerService from '../../services/workerService';
import db from '../../db/models';

module.exports = {
  async up(queryInterface: QueryInterface, Sequelize: typeof import('sequelize').Sequelize): Promise<void> {
    console.log('Starting seed: clients-meetings data population');
    
    try {
      const dataService = new DataPopulationService(queryInterface);
      
      const csvFilePath = path.join(__dirname, 'clients-meetings.csv');
      
      const results = await dataService.populateFromCSV(csvFilePath);
      
      console.log('Data population completed successfully:');
      console.log(`- Clients: ${results.clients.inserted} inserted, ${results.clients.skipped || 0} skipped`);
      console.log(`- Sellers: ${results.sellers.inserted} inserted`);
      console.log(`- Meetings: ${results.meetings.inserted} inserted, ${results.meetings.skipped || 0} skipped`);
      console.log(`- Total CSV rows processed: ${results.total}`);

      if (results.meetings.inserted > 0) {
        console.log('Auto-queuing classifications for meetings...');
        await queueClassificationsForSeed();
      }
      
    } catch (error) {
      console.error('Seed failed:', (error as Error).message);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof import('sequelize').Sequelize): Promise<void> {
    console.log('Rolling back seed: clients-meetings data');

    try {
      await queryInterface.bulkDelete('meetings_classifications', {}, {});
      console.log('Deleted all meetings classifications');

      await queryInterface.bulkDelete('meetings', {}, {});
      console.log('Deleted all meetings');

      await queryInterface.bulkDelete('sellers', {}, {});
      console.log('Deleted all sellers');

      await queryInterface.bulkDelete('clients', {}, {});
      console.log('Deleted all clients');

      console.log('Seed rollback completed successfully');

    } catch (error) {
      console.error('Seed rollback failed:', (error as Error).message);
      throw error;
    }
  }
};

async function queueClassificationsForSeed(): Promise<void> {
  try {
    const workerService = new WorkerService();

    const meetings = await db.Meeting.findAll({
      attributes: ['id', 'client_id', 'seller_id'],
      order: [['id', 'ASC']]
    });

    console.log(`Found ${meetings.length} meetings to queue for classification`);

    let queued = 0;
    const taskIds: string[] = [];

    for (const meeting of meetings) {
      try {
        const meetingClassification = await db.MeetingClassification.findOne({
          where: {
            meeting_id: meeting.id
          }
        });

        if (meetingClassification) {
          
          console.log(`Skipping classification for meeting ${meeting.id} because it already has a classification`);
          continue;
        }
        const result = await workerService.classifyMeeting(meeting.id);
        taskIds.push(result.taskId);
        queued++;

        console.log(`Queued classification for meeting ${meeting.id} (task: ${result.taskId})`);

      } catch (error) {
        console.warn(`Failed to queue meeting ${meeting.id}:`, (error as Error).message);
      }
    }

    console.log(`Successfully queued ${queued}/${meetings.length} meetings for classification`);
    console.log(`Task IDs: [${taskIds.join(', ')}]`);

  } catch (error) {
    console.error('Error queuing classifications:', error);
    throw error;
  }
}
