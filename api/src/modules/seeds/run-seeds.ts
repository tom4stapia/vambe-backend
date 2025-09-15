import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../app.module";
import { SeedsService } from "./seeds.service";

async function runSeeds() {
  console.log("🌱 Starting seeds...");

  try {
    const app = await NestFactory.createApplicationContext(AppModule);
    const seedsService = app.get(SeedsService);

    await seedsService.populateClientsMeetings();
    console.log("✅ Seeds completed successfully");

    await app.close();
  } catch (error) {
    console.error("❌ Seeds failed:", error);
    process.exit(1);
  }
}

runSeeds();
