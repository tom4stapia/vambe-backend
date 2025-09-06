import * as path from 'path';
import { QueryInterface, Sequelize } from 'sequelize';
import { DataPopulationService } from '../services/dataPopulationService';

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
      
    } catch (error) {
      console.error('Seed failed:', (error as Error).message);
      throw error;
    }
  },

  async down(queryInterface: QueryInterface, Sequelize: typeof import('sequelize').Sequelize): Promise<void> {
    console.log('Rolling back seed: clients-meetings data');
    
    try {
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
