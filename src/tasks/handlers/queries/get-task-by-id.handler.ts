import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repo/task.repository';
import { Task } from '../../entities/task.entity';
import { TaskNotFoundException } from '../../../shared/exceptions';
import { GetTaskByIdQuery } from 'src/tasks/queries/queries';

@Injectable()
@QueryHandler(GetTaskByIdQuery)
export class GetTaskByIdHandler implements IQueryHandler<GetTaskByIdQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetTaskByIdQuery): Promise<Task> {
    const task = await this.taskRepository.findById(query.id);
    
    if (!task) {
      throw new TaskNotFoundException(query.id);
    }
    
    return task;
  }
}
