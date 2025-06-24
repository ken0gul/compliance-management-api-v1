import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { 
  CreateTaskCommand, 
  UpdateTaskCommand, 
  DeleteTaskCommand,
} from '../commands/commands';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { GetAllTasksQuery, GetTaskByIdQuery } from '../queries/queries';

@Injectable()
export class TaskDomainService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.commandBus.execute(new CreateTaskCommand(createTaskDto));
  }

  async getAllTasks(framework?: string, category?: string): Promise<Task[]> {
    return await this.queryBus.execute(new GetAllTasksQuery(framework, category));
  }

  async getTaskById(id: string): Promise<Task> {
    return await this.queryBus.execute(new GetTaskByIdQuery(id));
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.commandBus.execute(new UpdateTaskCommand(id, updateTaskDto));
  }

  async deleteTask(id: string): Promise<void> {
    return await this.commandBus.execute(new DeleteTaskCommand(id));
  }
}
