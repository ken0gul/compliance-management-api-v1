import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { DeleteTaskCommand } from '../../commands/commands';
import { TaskRepository } from '../../repo/task.repository';
import { TaskNotFoundException } from '../../../shared/exceptions';

@Injectable()
@CommandHandler(DeleteTaskCommand)
export class DeleteTaskHandler implements ICommandHandler<DeleteTaskCommand> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(command: DeleteTaskCommand): Promise<void> {
    const exists = await this.taskRepository.findById(command.id);
    
    if (!exists) {
      throw new TaskNotFoundException(command.id);
    }
    
    await this.taskRepository.delete(command.id);
  }
}
