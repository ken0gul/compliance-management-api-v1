import { Inject, Injectable, Logger } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserRole } from '../entities/user.entity';
import { IUserSeederService } from '../interfaces/user-seeder-service.interface';
import { IUserRepository } from '../interfaces/user-repository.interface';

@Injectable()
export class UserSeederService implements IUserSeederService {

  private readonly logger = new Logger(UserSeederService.name);

  constructor(@Inject("IUserRepository") private readonly userRepository: IUserRepository) {}

  async onModuleInit(): Promise<void> {
    await this.seedDefaultUsers();
  }

  private async seedDefaultUsers(): Promise<void> {
    try {
      await this.createDefaultUserIfNotExists({
        username: 'admin',
        password: 'admin123',
        email: 'admin@compliance.com',
        firstName: 'System',
        lastName: 'Administrator',
        role: UserRole.ADMIN,
      });

      await this.createDefaultUserIfNotExists({
        username: 'user',
        password: 'user123',
        email: 'user@compliance.com',
        firstName: 'Standard',
        lastName: 'User',
        role: UserRole.STANDARD,
      });

      this.logger.log('Default users seeding completed successfully');
    } catch (error) {
      this.logger.error('Failed to seed default users', error);
    }
  }

  private async createDefaultUserIfNotExists(userData: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  }): Promise<void> {
    const userExists = await this.userRepository.userExists(userData.username);

    if (!userExists) {
      await this.userRepository.createUser(userData);
      this.logger.log(`Created default ${userData.role} user: ${userData.username}`);
    } else {
      this.logger.log(`User '${userData.username}' already exists, skipping creation`);
    }
  }
}
