import {
  IsInt,
  IsDateString,
  IsOptional,
  IsBoolean,
  IsString,
  Min,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateMeetingDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  client_id: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  seller_id: number;

  @IsDateString()
  meeting_at: string;

  @IsOptional()
  @IsString()
  transcript?: string;
}

export class UpdateMeetingDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  client_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  seller_id?: number;

  @IsOptional()
  @IsDateString()
  meeting_at?: string;

  @IsOptional()
  @IsBoolean()
  closed?: boolean;

  @IsOptional()
  @IsString()
  transcript?: string;
}
