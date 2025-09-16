import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { User, UserRole } from '../../../database/models/user.model';

@Injectable()
export class SuperAdminPopulationService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async populateSuperAdmin(): Promise<void> {
    console.log('🌱 Starting super admin population...');

    const superAdminEmail = this.configService.get<string>('app.superAdminEmail');
    const superAdminPassword = this.configService.get<string>('app.superAdminPassword');
    const superAdminName = this.configService.get<string>('app.superAdminName');

    try {
      const existingSuperAdmin = await this.userModel.findOne({
        where: { email: superAdminEmail }
      });

      if (existingSuperAdmin) {
        console.log('✅ Super admin already exists, skipping creation');
        return;
      }

      const superAdmin = await this.userModel.create({
        email: superAdminEmail,
        name: superAdminName,
        password: superAdminPassword,
        role: UserRole.SUPER_ADMIN,
        active: true,
      });

    } catch (error) {
      console.error('❌ Error creating super admin:', error);
      throw error;
    }
  }
}
