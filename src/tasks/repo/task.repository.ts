import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { BaseRepository } from '../../shared/base.repository';
import { Task } from '../entities/task.entity';
import { ITaskRepository } from '../interfaces/task-repository.interface';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

@Injectable()
export class TaskRepository extends BaseRepository<Task> implements ITaskRepository {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(framework?: string, category?: string): Promise<Task[]> {
    const whereCondition: FindOptionsWhere<Task> = {};
    
    if (framework) {
      whereCondition.framework = framework;
    }
    
    if (category) {
      whereCondition.category = category;
    }

    if (Object.keys(whereCondition).length > 0) {
      return await this.findByCondition(whereCondition);
    }
    
    return await super.findAll();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {
    return await super.update(id, updateTaskDto);
  }
}
