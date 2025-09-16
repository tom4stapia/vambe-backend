import { Controller, Post, HttpStatus, HttpCode, UseGuards } from "@nestjs/common";
import { SeedsService } from "./seeds.service";
import { JwtAuthGuard, RolesGuard } from "../../common/guards";
import { Roles, CurrentUser } from "../../common/decorators";
import { User, UserRole } from "../../database/models/user.model";

@Controller("seeds")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.SUPER_ADMIN)
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Post("populate")
  @HttpCode(HttpStatus.OK)
  async populateData(@CurrentUser() user: User) {
    await this.seedsService.populateClientsMeetings();
    return { 
      success: true,
      message: "Seeds executed successfully" 
    };
  }
}
