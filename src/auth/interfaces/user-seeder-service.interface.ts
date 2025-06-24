import { OnModuleInit } from '@nestjs/common';

export interface IUserSeederService extends OnModuleInit {
  onModuleInit(): Promise<void>;
}
