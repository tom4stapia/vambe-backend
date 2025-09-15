import {
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from "class-validator";

export class CreateClientDto {
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  name: string;

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
}

export class UpdateClientDto {
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
}
