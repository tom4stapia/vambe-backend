import { Injectable } from "@nestjs/common";
import { ClientPopulationService } from "./services/client-population.service";
import { SellerPopulationService } from "./services/seller-population.service";
import { MeetingPopulationService } from "./services/meeting-population.service";
import { ClassificationQueueService } from "./services/classification-queue.service";
import { SuperAdminPopulationService } from "./services/super-admin-population.service";
import { CsvUtils } from "./utils/csv.utils";

@Injectable()
export class SeedsService {
  constructor(
    private clientPopulationService: ClientPopulationService,
    private sellerPopulationService: SellerPopulationService,
    private meetingPopulationService: MeetingPopulationService,
    private classificationQueueService: ClassificationQueueService,
    private superAdminPopulationService: SuperAdminPopulationService,
  ) {}

  async populateClientsMeetings(): Promise<void> {
    console.log("🌱 Starting seed: clients-meetings data population");

    try {
      await this.superAdminPopulationService.populateSuperAdmin();
      const csvFilePath = CsvUtils.getCsvFilePath();
      const csvData = CsvUtils.parseCSV(csvFilePath);
    
      CsvUtils.validateCsvData(csvData);

      const clientsResult = await this.clientPopulationService.populateClients(csvData);
      const sellersResult = await this.sellerPopulationService.populateSellers(csvData);
      const meetingsResult = await this.meetingPopulationService.populateMeetings(csvData);

      console.log("✅ Data population completed successfully:");
      console.log(
        `- Clients: ${clientsResult.inserted} inserted, ${clientsResult.skipped} skipped`,
      );
      console.log(
        `- Sellers: ${sellersResult.inserted} inserted, ${sellersResult.skipped} skipped`,
      );
      console.log(
        `- Meetings: ${meetingsResult.inserted} inserted, ${meetingsResult.skipped} skipped`,
      );
      console.log(`- Total CSV rows processed: ${csvData.length}`);

      if (meetingsResult.insertedMeetingIds.length > 0) {
        console.log("🔄 Auto-queuing classifications for meetings...");
        await this.classificationQueueService.queueClassificationsForMeetings(
          meetingsResult.insertedMeetingIds,
        );
      } else {
        console.log("No new meetings to classify");
      }
    } catch (error) {
      console.error("❌ Seed failed:", (error as Error).message);
      console.log("⚠️  Continuing with application startup...");
    }
  }
}
