import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '../../database/models/user.model';
import { LoginDto, RegisterDto, AuthResponseDto, JwtPayloadDto, RefreshTokenDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ where: { email } });

    if (user && await user.validatePassword(password)) {
      return user;
    }
    
    return null;
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.active) {
      throw new UnauthorizedException('Account is inactive');
    }

    const payload: JwtPayloadDto = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '3h',
    });

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        active: user.active,
      },
    };
  }

  async register(registerDto: RegisterDto, currentUser?: User): Promise<AuthResponseDto> {
    // Solo super_admin puede registrar usuarios
    if (currentUser && currentUser.role !== UserRole.SUPER_ADMIN) {
      throw new UnauthorizedException('Only super admin can register users');
    }

    // Verificar si el email ya existe
    const existingUser = await this.userModel.findOne({ where: { email: registerDto.email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Si no hay usuario actual, solo permitir registro de super_admin
    if (!currentUser && registerDto.role !== UserRole.SUPER_ADMIN) {
      throw new BadRequestException('Only super admin registration is allowed without authentication');
    }

    const user = await this.userModel.create({
      email: registerDto.email,
      name: registerDto.name,
      password: registerDto.password,
      role: registerDto.role || UserRole.USER,
      active: true,
    });

    const payload: JwtPayloadDto = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: '3h',
    });

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        active: user.active,
      },
    };
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.userModel.findByPk(userId, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.decode(refreshTokenDto.access_token) as JwtPayloadDto;
      
      if (!payload || !payload.sub) {
        throw new UnauthorizedException('Invalid token');
      }

      const now = Math.floor(Date.now() / 1000);
      const tokenAge = now - (payload.iat || 0);
      const maxAge = 7 * 24 * 60 * 60; 
      
      if (tokenAge > maxAge) {
        throw new UnauthorizedException('Token is too old to refresh');
      }
      
      const user = await this.userModel.findByPk(payload.sub, {
        attributes: { exclude: ['password'] },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.active) {
        throw new UnauthorizedException('Account is inactive');
      }

      const newPayload: JwtPayloadDto = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const newAccessToken = this.jwtService.sign(newPayload, {
        expiresIn: '3h',
      });

      return {
        access_token: newAccessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          active: user.active,
        },
      };
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      } else {
        throw new UnauthorizedException('Token refresh failed');
      }
    }
  }
}
