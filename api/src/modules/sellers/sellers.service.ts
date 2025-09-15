import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Seller } from "../../database/models/seller.model";
import { Meeting } from "../../database/models/meeting.model";
import { CreateSellerDto, UpdateSellerDto } from "./dto/seller.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { SellerModel } from "../../types/api.types";

@Injectable()
export class SellersService {
  constructor(
    @InjectModel(Seller)
    private sellerModel: typeof Seller,
    @InjectModel(Meeting)
    private meetingModel: typeof Meeting,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ sellers: SellerModel[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = "id",
      sortOrder = "ASC",
    } = paginationDto;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.sellerModel.findAndCountAll({
      limit,
      offset,
      order: [[this.sanitizeColumn(sortBy), sortOrder]],
      raw: true,
    });

    return {
      sellers: rows as SellerModel[],
      total: count,
    };
  }

  async findOne(id: number): Promise<SellerModel> {
    const seller = await this.sellerModel.findByPk(id, { raw: true });

    if (!seller) {
      throw new NotFoundException("Seller not found");
    }

    return seller as SellerModel;
  }

  async create(createSellerDto: CreateSellerDto): Promise<SellerModel> {
    try {
      const seller = await this.sellerModel.create({
        name: createSellerDto.name,
        email: createSellerDto.email,
        phone: createSellerDto.phone || null,
        active:
          createSellerDto.active !== undefined ? createSellerDto.active : true,
        prompt: createSellerDto.prompt || '',
      });

      return seller.toJSON() as SellerModel;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new BadRequestException("Email already exists");
      }
      throw new BadRequestException("Failed to create seller");
    }
  }

  async update(
    id: number,
    updateSellerDto: UpdateSellerDto,
  ): Promise<SellerModel> {
    const seller = await this.sellerModel.findByPk(id);

    if (!seller) {
      throw new NotFoundException("Seller not found");
    }

    try {
      const updateData: any = {};
      if (updateSellerDto.name !== undefined)
        updateData.name = updateSellerDto.name;
      if (updateSellerDto.email !== undefined)
        updateData.email = updateSellerDto.email;
      if (updateSellerDto.phone !== undefined)
        updateData.phone = updateSellerDto.phone;
      if (updateSellerDto.active !== undefined)
        updateData.active = updateSellerDto.active;
      if (updateSellerDto.prompt !== undefined)
        updateData.prompt = updateSellerDto.prompt;

      if (Object.keys(updateData).length === 0) {
        return seller.toJSON() as SellerModel;
      }

      await seller.update(updateData);
      return seller.toJSON() as SellerModel;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new BadRequestException("Email already exists");
      }
      throw new BadRequestException("Failed to update seller");
    }
  }

  async remove(id: number): Promise<void> {
    const seller = await this.sellerModel.findByPk(id, {
      include: [
        {
          model: this.meetingModel,
          as: "meetings",
        },
      ],
    });

    if (!seller) {
      throw new NotFoundException("Seller not found");
    }

    const meetingCount = seller.meetings?.length || 0;
    if (meetingCount > 0) {
      throw new BadRequestException(
        "Cannot delete seller with associated meetings",
      );
    }

    await seller.destroy();
  }

  async getActiveSellers(): Promise<SellerModel[]> {
    const sellers = await this.sellerModel.findAll({
      where: { active: true },
      order: [["name", "ASC"]],
      raw: true,
    });

    return sellers as SellerModel[];
  }

  private sanitizeColumn(column: string): string {
    const allowedColumns = [
      "id",
      "name",
      "email",
      "phone",
      "active",
      "prompt",
      "created_at",
      "updated_at",
    ];
    return allowedColumns.includes(column) ? column : "id";
  }
}
