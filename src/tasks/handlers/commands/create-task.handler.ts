import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { CreateTaskCommand } from '../../commands/commands';
import { TaskRepository } from '../../repo/task.repository';
import { Task } from '../../entities/task.entity';

@Injectable()
@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: CreateTaskCommand): Promise<Task> {
    return await this.taskRepository.create(command.createTaskDto);
  }
}
