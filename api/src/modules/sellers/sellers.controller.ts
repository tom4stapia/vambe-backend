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
} from "@nestjs/common";
import { SellersService } from "./sellers.service";
import { CreateSellerDto, UpdateSellerDto } from "./dto/seller.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";
import { ApiResponse, PaginationMeta } from "../../types/api.types";

@Controller("sellers")
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<ApiResponse> {
    const result = await this.sellersService.findAll(paginationDto);

    const response: ApiResponse = {
      success: true,
      data: {
        sellers: result.sellers,
        pagination: {
          page: paginationDto.page || 1,
          limit: paginationDto.limit || 10,
          total: result.total,
          totalPages: Math.ceil(result.total / (paginationDto.limit || 10)),
        } as PaginationMeta,
      },
      message: "Sellers retrieved successfully",
    };

    return response;
  }

  @Get(":id")
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
    const seller = await this.sellersService.findOne(id);

    const response: ApiResponse = {
      success: true,
      data: seller,
      message: "Seller retrieved successfully",
    };

    return response;
  }

  @Post()
  async create(@Body() createSellerDto: CreateSellerDto): Promise<ApiResponse> {
    const seller = await this.sellersService.create(createSellerDto);

    const response: ApiResponse = {
      success: true,
      data: seller,
      message: "Seller created successfully",
    };

    return response;
  }

  @Patch(":id")
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() updateSellerDto: UpdateSellerDto,
  ): Promise<ApiResponse> {
    const seller = await this.sellersService.update(id, updateSellerDto);

    const response: ApiResponse = {
      success: true,
      data: seller,
      message: "Seller updated successfully",
    };

    return response;
  }

  @Delete(":id")
  async remove(@Param("id", ParseIntPipe) id: number): Promise<ApiResponse> {
    await this.sellersService.remove(id);

    const response: ApiResponse = {
      success: true,
      message: "Seller deleted successfully",
    };

    return response;
  }

  @Get("active")
  async getActiveSellers(): Promise<ApiResponse> {
    const sellers = await this.sellersService.getActiveSellers();

    const response: ApiResponse = {
      success: true,
      data: sellers,
      message: "Active sellers retrieved successfully",
    };

    return response;
  }
}
