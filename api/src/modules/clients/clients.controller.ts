import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpStatus,
} from "@nestjs/common";
import { ClientsService } from "./clients.service";
import { CreateClientDto, UpdateClientDto } from "./dto/client.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { ApiResponse, PaginationMeta } from "../../types/api.types";

@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse> {
    const result = await this.clientsService.findAll(paginationDto);

    const response: ApiResponse = {
      success: true,
      data: {
        clients: result.clients,
        pagination: {
          page: paginationDto.page || 1,
          limit: paginationDto.limit || 10,
          total: result.total,
          totalPages: Math.ceil(result.total / (paginationDto.limit || 10)),
        } as PaginationMeta,
      },
      message: "Clients retrieved successfully",
    };

    return response;
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
    const client = await this.clientsService.findOne(id);

    const response: ApiResponse = {
      success: true,
      data: client,
      message: "Client retrieved successfully",
    };

    return response;
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto): Promise<ApiResponse> {
    const client = await this.clientsService.create(createClientDto);

    const response: ApiResponse = {
      success: true,
      data: client,
      message: "Client created successfully",
    };

    return response;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ApiResponse> {
    const client = await this.clientsService.update(id, updateClientDto);

    const response: ApiResponse = {
      success: true,
      data: client,
      message: "Client updated successfully",
    };

    return response;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
    await this.clientsService.remove(id);

    const response: ApiResponse = {
      success: true,
      message: "Client deleted successfully",
    };

    return response;
  }
}
