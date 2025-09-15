import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Seller } from '../../../database/models/seller.model';

export interface PopulationResult {
  inserted: number;
  skipped: number;
}

@Injectable()
export class SellerPopulationService {
  constructor(
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
  ) {}

  async populateSellers(csvData: any[]): Promise<PopulationResult> {
    console.log('👨‍💼 Populating sellers...');
    const results: PopulationResult = { inserted: 0, skipped: 0 };
    const uniqueSellers = new Map();

    for (const row of csvData) {
      if (
        row['Vendedor asignado'] &&
        !uniqueSellers.has(row['Vendedor asignado'])
      ) {
        try {
          const [seller, created] = await this.sellerModel.findOrCreate({
            where: { name: row['Vendedor asignado'] },
            defaults: {
              name: row['Vendedor asignado'],
              email: `${row['Vendedor asignado']
                .toLowerCase()
                .replace(' ', '.')}@vambe.com`,
              phone: '56912345678',
              active: true,
            },
          });

          uniqueSellers.set(row['Vendedor asignado'], true);

          if (created) {
            results.inserted++;
          } else {
            results.skipped++;
          }
        } catch (error: any) {
          console.log(
            `⚠️  Error processing seller ${row['Vendedor asignado']}: ${error.message}`,
          );
          results.skipped++;
        }
      }
    }

    return results;
  }
}
