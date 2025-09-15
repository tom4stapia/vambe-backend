import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Client } from '../../../database/models/client.model';

export interface PopulationResult {
  inserted: number;
  skipped: number;
}

@Injectable()
export class ClientPopulationService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
  ) {}

  async populateClients(csvData: any[]): Promise<PopulationResult> {
    console.log('👥 Populating clients...');
    const results: PopulationResult = { inserted: 0, skipped: 0 };
    const uniqueClients = new Map();

    for (const row of csvData) {
      if (
        row['Correo Electronico'] &&
        !uniqueClients.has(row['Correo Electronico'])
      ) {
        try {
          const [client, created] = await this.clientModel.findOrCreate({
            where: { email: row['Correo Electronico'] },
            defaults: {
              name: row['Nombre'],
              email: row['Correo Electronico'],
              phone: row['Numero de Telefono'],
            },
          });

          uniqueClients.set(row['Correo Electronico'], true);

          if (created) {
            results.inserted++;
          } else {
            results.skipped++;
          }
        } catch (error: any) {
          console.log(
            `⚠️  Error processing client ${row['Correo Electronico']}: ${error.message}`,
          );
          results.skipped++;
        }
      }
    }

    return results;
  }
}
