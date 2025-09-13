import { IsOptional, IsInt, Min, Max, IsIn } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @IsOptional()
  sortBy?: string = "id";

  @IsOptional()
  @IsIn(["ASC", "DESC"])
  sortOrder?: "ASC" | "DESC" = "ASC";
}
