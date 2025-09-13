import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class CreateSellerDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @Matches(/^[+]?[\d\s\-\(\)]{8,15}$/, {
    message:
      "Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix",
  })
  phone?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean = true;
}

export class UpdateSellerDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Matches(/^[+]?[\d\s\-\(\)]{8,15}$/, {
    message:
      "Phone number must be between 8 and 15 characters and contain only digits, spaces, hyphens, parentheses, and optional + prefix",
  })
  phone?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
