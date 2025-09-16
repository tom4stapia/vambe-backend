import { IsEmail, IsString, MinLength, IsOptional, IsEnum } from 'class-validator';
import { UserRole } from '../../../database/models/user.model';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class AuthResponseDto {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: UserRole;
    active: boolean;
  };
}

export class RefreshTokenDto {
  @IsString()
  access_token: string;
}

export class JwtPayloadDto {
  sub: number;
  email: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
