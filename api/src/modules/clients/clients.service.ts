import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Client } from "../../database/models/client.model";
import { CreateClientDto, UpdateClientDto } from "./dto/client.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { ClientModel } from "../../types/api.types";

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
  ) {}

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<{ clients: ClientModel[]; total: number }> {
    const {
      page = 1,
      limit = 10,
      sortBy = "id",
      sortOrder = "ASC",
    } = paginationDto;
    const offset = (page - 1) * limit;

    const { count, rows } = await this.clientModel.findAndCountAll({
      limit,
      offset,
      order: [[this.sanitizeColumn(sortBy), sortOrder]],
      raw: true,
    });

    return {
      clients: rows as ClientModel[],
      total: count,
    };
  }

  async findOne(id: number): Promise<ClientModel> {
    const client = await this.clientModel.findByPk(id, { raw: true });

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    return client as ClientModel;
  }

  async create(createClientDto: CreateClientDto): Promise<ClientModel> {
    try {
      const client = await this.clientModel.create({
        name: createClientDto.name,
        email: createClientDto.email || null,
        phone: createClientDto.phone || null,
      });

      return client.toJSON() as ClientModel;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new BadRequestException("Email already exists");
      }
      throw new BadRequestException("Failed to create client");
    }
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<ClientModel> {
    const client = await this.clientModel.findByPk(id);

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    try {
      const updateData: any = {};
      if (updateClientDto.name !== undefined)
        updateData.name = updateClientDto.name;
      if (updateClientDto.email !== undefined)
        updateData.email = updateClientDto.email;
      if (updateClientDto.phone !== undefined)
        updateData.phone = updateClientDto.phone;

      if (Object.keys(updateData).length === 0) {
        return client.toJSON() as ClientModel;
      }

      await client.update(updateData);
      return client.toJSON() as ClientModel;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new BadRequestException("Email already exists");
      }
      throw new BadRequestException("Failed to update client");
    }
  }

  async remove(id: number): Promise<void> {
    const client = await this.clientModel.findByPk(id);

    if (!client) {
      throw new NotFoundException("Client not found");
    }

    await client.destroy();
  }

  private sanitizeColumn(column: string): string {
    const allowedColumns = [
      "id",
      "name",
      "email",
      "phone",
      "created_at",
      "updated_at",
    ];
    return allowedColumns.includes(column) ? column : "id";
  }
}
