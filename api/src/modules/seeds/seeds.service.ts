import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Meeting } from "../../database/models/meeting.model";
import { Client } from "../../database/models/client.model";
import { Seller } from "../../database/models/seller.model";
import { MeetingClassification } from "../../database/models/meeting-classification.model";
import { WorkersService } from "../workers/workers.service";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class SeedsService {
  constructor(
    @InjectModel(Meeting)
    private meetingModel: typeof Meeting,
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
    @InjectModel(MeetingClassification)
    private meetingClassificationModel: typeof MeetingClassification,
    private workersService: WorkersService,
  ) {}

  async populateClientsMeetings(): Promise<void> {
    console.log("🌱 Starting seed: clients-meetings data population");

    try {
      const csvFilePath = this.getCsvFilePath();

      const csvData = this.parseCSV(csvFilePath);

      const clientsResult = await this.populateClients(csvData);

      const sellersResult = await this.populateSellers(csvData);

      const meetingsResult = await this.populateMeetings(csvData);

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

      if (meetingsResult.inserted > 0) {
        console.log("🔄 Auto-queuing classifications for meetings...");
        await this.queueClassificationsForMeetings(
          meetingsResult.insertedMeetingIds,
        );
      }
    } catch (error) {
      console.error("❌ Seed failed:", (error as Error).message);
      if (
        (error as Error).message.includes("duplicate key") ||
        (error as Error).message.includes("already exists")
      ) {
        console.log("⚠️  Data already exists, continuing...");
      } else {
        throw error;
      }
    }
  }

  async queueClassificationsForMeetings(meetingIds?: number[]): Promise<void> {
    try {
      for (const meetingId of meetingIds) {
        const existingClassification =
          await this.meetingClassificationModel.findOne({
            where: { meeting_id: meetingId },
          });
        if (!existingClassification) {
          console.log(`🔄 Classifying meeting ${meetingId}...`);
          await this.workersService.classifyMeeting(meetingId);
        } else {
          console.log(`✅ Meeting ${meetingId} already has a classification`);
        }
      }
    } catch (error) {
      console.error("Error queuing classifications:", error);
      throw error;
    }
  }

  private parseCSV(filePath: string): any[] {
    console.log(`📁 Reading CSV from: ${filePath}`);
    const csvContent = fs.readFileSync(filePath, "utf-8");
    const lines = csvContent.split("\n").filter((line) => line.trim());
    const headers = lines[0].split(",").map((h) => h.trim());

    const csvData = lines.slice(1).map((line) => {
      const values = line.split(",").map((v) => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });
      return row;
    });

    console.log(`📊 Found ${csvData.length} rows in CSV`);
    return csvData;
  }

  private getCsvFilePath(): string {
    const possiblePaths = [
      path.join(__dirname, "../../database/seeds/clients-meetings.csv"),
      path.join(process.cwd(), "src/database/seeds/clients-meetings.csv"),
      path.join(process.cwd(), "api/src/database/seeds/clients-meetings.csv"),
      "/app/src/database/seeds/clients-meetings.csv",
    ];

    let csvFilePath: string | null = null;
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        csvFilePath = possiblePath;
        break;
      }
    }

    if (!csvFilePath) {
      throw new Error(
        `CSV file not found. Tried paths: ${possiblePaths.join(", ")}`,
      );
    }

    return csvFilePath;
  }

  private async populateClients(
    csvData: any[],
  ): Promise<{ inserted: number; skipped: number }> {
    console.log("👥 Populating clients...");
    const results = { inserted: 0, skipped: 0 };
    const uniqueClients = new Map();

    for (const row of csvData) {
      if (
        row["Correo Electronico"] &&
        !uniqueClients.has(row["Correo Electronico"])
      ) {
        try {
          await this.clientModel.create({
            name: row["Nombre"],
            email: row["Correo Electronico"],
            phone: row["Numero de Telefono"],
          });
          uniqueClients.set(row["Correo Electronico"], true);
          results.inserted++;
        } catch (error: any) {
          if (error.message && error.message.includes("duplicate key")) {
            results.skipped++;
          } else {
            throw error;
          }
        }
      }
    }
    return results;
  }

  private async populateSellers(
    csvData: any[],
  ): Promise<{ inserted: number; skipped: number }> {
    console.log("👨‍💼 Populating sellers...");
    const results = { inserted: 0, skipped: 0 };
    const uniqueSellers = new Map();

    for (const row of csvData) {
      if (
        row["Vendedor asignado"] &&
        !uniqueSellers.has(row["Vendedor asignado"])
      ) {
        try {
          await this.sellerModel.create({
            name: row["Vendedor asignado"],
            email: `${row["Vendedor asignado"].toLowerCase().replace(" ", ".")}@vambe.com`,
            phone: "56912345678",
            active: true,
          });
          uniqueSellers.set(row["Vendedor asignado"], true);
          results.inserted++;
        } catch (error: any) {
          if (error.message && error.message.includes("duplicate key")) {
            console.log(`✅ Seller ${row["Vendedor asignado"]} already exists`);
            results.skipped++;
          } else {
            throw error;
          }
        }
      }
    }
    return results;
  }

  private async populateMeetings(
    csvData: any[],
  ): Promise<{
    inserted: number;
    skipped: number;
    insertedMeetingIds: number[];
  }> {
    console.log("📅 Populating meetings...");
    const results = {
      inserted: 0,
      skipped: 0,
      insertedMeetingIds: [] as number[],
    };

    for (const row of csvData) {
      try {
        const client = await this.clientModel.findOne({
          where: { email: row["Correo Electronico"] },
        });
        const seller = await this.sellerModel.findOne({
          where: { name: row["Vendedor asignado"] },
        });

        if (client && seller) {
          const meeting = await this.meetingModel.create({
            client_id: client.id,
            seller_id: seller.id,
            meeting_at: new Date(row["Fecha de la Reunion"]),
            closed: row["closed"] === "1",
            transcript: row["Transcripcion"],
          });
          results.inserted++;
          results.insertedMeetingIds.push(meeting.id);
        }
      } catch (error: any) {
        if (error.message && error.message.includes("duplicate key")) {
          results.skipped++;
        } else {
          throw error;
        }
      }
    }
    return results;
  }
}
