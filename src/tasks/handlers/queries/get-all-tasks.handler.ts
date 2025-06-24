import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../repo/task.repository';
import { Task } from '../../entities/task.entity';
import { GetAllTasksQuery } from 'src/tasks/queries/queries';

@Injectable()
@QueryHandler(GetAllTasksQuery)
export class GetAllTasksHandler implements IQueryHandler<GetAllTasksQuery> {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute(query: GetAllTasksQuery): Promise<Task[]> {
    var tasks = await this.taskRepository.findAll(query.framework, query.category);
    if (!tasks || tasks.length === 0) {
      throw new Error('No tasks found');
    }
    return tasks;
  }
}
