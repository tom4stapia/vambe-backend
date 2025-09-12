import { QueryInterface, QueryTypes } from 'sequelize';
import { CSVParser } from '../utils/csvParser';
import { ClientMapper } from '../mappers/clientMapper';
import { SellerMapper } from '../mappers/sellerMapper';
import { MeetingMapper } from '../mappers/meetingMapper';
import { 
  ClientCSVRow, 
  PopulationResult, 
  PopulationSummary, 
  DatabaseRecord,
  ClientData,
  SellerData,
  MeetingData
} from '../types';

export class DataPopulationService {
  private queryInterface: QueryInterface;
  private clientNameToIdMap = new Map<string, number>();
  private sellerNameToIdMap = new Map<string, number>();

  constructor(queryInterface: QueryInterface) {
    this.queryInterface = queryInterface;
  }
  async populateFromCSV(csvFilePath: string): Promise<PopulationSummary> {
    try {
      console.log('Starting data population from CSV...');
      
      const csvData = await CSVParser.parseFile(csvFilePath) as ClientCSVRow[];
      console.log(`Parsed ${csvData.length} rows from CSV`);
      
      const clientsResult = await this.populateClients(csvData);
      const sellersResult = await this.populateSellers(csvData);
      const meetingsResult = await this.populateMeetings(csvData);
      
      return {
        clients: clientsResult,
        sellers: sellersResult,
        meetings: meetingsResult,
        total: csvData.length
      };
      
    } catch (error) {
      console.error('Failed to populate data:', (error as Error).message);
      throw error;
    }
  }

  private async populateClients(csvData: ClientCSVRow[]): Promise<PopulationResult> {
    console.log('Populating clients...');
    
    const clients: ClientData[] = [];
    const processedEmails = new Set<string>();
    
    for (const row of csvData) {
      try {
        const clientData = ClientMapper.mapFromCSV(row);
        ClientMapper.validate(clientData);
        
        if (clientData.email && processedEmails.has(clientData.email)) {
          console.warn(`Duplicate email found: ${clientData.email}, skipping...`);
          continue;
        }
        
        if (clientData.email) {
          processedEmails.add(clientData.email);
        }
        
        clients.push(clientData);
        
      } catch (error) {
        console.warn(`Failed to process client row: ${(error as Error).message}`);
      }
    }
    
    if (clients.length > 0) {
      await this.queryInterface.bulkInsert('clients', clients);
      
      await this.buildClientNameToIdMap();
    }
    
    console.log(`Inserted ${clients.length} clients`);
    return { inserted: clients.length, skipped: csvData.length - clients.length };
  }

  private async populateSellers(csvData: ClientCSVRow[]): Promise<PopulationResult> {
    console.log('Populating sellers...');
    
    const sellers = SellerMapper.extractSellersFromCSV(csvData);
    
    sellers.forEach(seller => SellerMapper.validate(seller));
    
    if (sellers.length > 0) {
      await this.queryInterface.bulkInsert('sellers', sellers);
    
      await this.buildSellerNameToIdMap();
    }
    
    console.log(`Inserted ${sellers.length} sellers`);
    return { inserted: sellers.length };
  }

  private async populateMeetings(csvData: ClientCSVRow[]): Promise<PopulationResult> {
    console.log('Populating meetings...');
    
    const meetings: MeetingData[] = [];
    
    for (const row of csvData) {
      try {
        const clientName = ClientMapper.sanitizeName(row['Nombre']);
        const sellerName = SellerMapper.sanitizeName(row['Vendedor asignado']);
        
        if (!clientName || !sellerName) {
          console.warn('Missing client or seller name, skipping row');
          continue;
        }
        
        const clientId = this.clientNameToIdMap.get(clientName);
        const sellerId = this.sellerNameToIdMap.get(sellerName);
        
        if (!clientId) {
          console.warn(`Client not found for name: ${clientName}`);
          continue;
        }
        
        if (!sellerId) {
          console.warn(`Seller not found for name: ${sellerName}`);
          continue;
        }
        
        const meetingData = MeetingMapper.mapFromCSV(row, clientId, sellerId);
        MeetingMapper.validate(meetingData);
        
        meetings.push(meetingData);
        
      } catch (error) {
        console.warn(`Failed to process meeting row: ${(error as Error).message}`);
      }
    }
    
    if (meetings.length > 0) {
      await this.queryInterface.bulkInsert('meetings', meetings);
    }
    
    console.log(`Inserted ${meetings.length} meetings`);
    return { inserted: meetings.length, skipped: csvData.length - meetings.length };
  }

  private async buildClientNameToIdMap(): Promise<void> {
    const clients = await this.queryInterface.sequelize.query(
      'SELECT id, name FROM clients ORDER BY id',
      { type: QueryTypes.SELECT }
    ) as DatabaseRecord[];
    
    clients.forEach(client => {
      this.clientNameToIdMap.set(client.name, client.id);
    });
  }

  private async buildSellerNameToIdMap(): Promise<void> {
    const sellers = await this.queryInterface.sequelize.query(
      'SELECT id, name FROM sellers ORDER BY id',
      { type: QueryTypes.SELECT }
    ) as DatabaseRecord[];
    
    sellers.forEach(seller => {
      this.sellerNameToIdMap.set(seller.name, seller.id);
    });
  }
}
