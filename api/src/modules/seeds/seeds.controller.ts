import { Controller, Post } from "@nestjs/common";
import { SeedsService } from "./seeds.service";

@Controller("seeds")
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Post("populate")
  async populateData() {
    await this.seedsService.populateClientsMeetings();
    return { message: "Seeds executed successfully" };
  }
}
