import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TasksController } from './controllers/tasks.controller';
import { TaskDomainService } from './services/task-domain.service';
import { TaskRepository } from './repo/task.repository';
import { Task } from './entities/task.entity';

import { CreateTaskHandler } from './handlers/commands/create-task.handler';
import { UpdateTaskHandler } from './handlers/commands/update-task.handler';
import { DeleteTaskHandler } from './handlers/commands/delete-task.handler';

import { GetAllTasksHandler } from './handlers/queries/get-all-tasks.handler';
import { GetTaskByIdHandler } from './handlers/queries/get-task-by-id.handler';

const commandHandlers = [
  CreateTaskHandler,
  UpdateTaskHandler,
  DeleteTaskHandler,
];

const queryHandlers = [
  GetAllTasksHandler,
  GetTaskByIdHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    CqrsModule,
  ],
  controllers: [TasksController],
  providers: [
    TaskDomainService,
    TaskRepository,
    ...commandHandlers,
    ...queryHandlers,
  ],
  exports: [TaskDomainService],
})
export class TasksModule {}
