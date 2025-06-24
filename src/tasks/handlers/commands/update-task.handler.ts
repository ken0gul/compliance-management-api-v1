import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { UpdateTaskCommand } from '../../commands/commands';
import { TaskRepository } from '../../repo/task.repository';
import { Task } from '../../entities/task.entity';
import { TaskNotFoundException } from '../../../shared/exceptions';

@Injectable()
@CommandHandler(UpdateTaskCommand)
export class UpdateTaskHandler implements ICommandHandler<UpdateTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: UpdateTaskCommand): Promise<Task> {
    const task = await this.taskRepository.update(command.id, command.updateTaskDto);
    
    if (!task) {
      throw new TaskNotFoundException(command.id);
    }
    
    return task;
  }
}
