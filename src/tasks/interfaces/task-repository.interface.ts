import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

export interface ITaskRepository {
  create(createTaskDto: CreateTaskDto): Promise<Task>;
  findAll(framework?: string, category?: string): Promise<Task[]>;
  findById(id: string): Promise<Task | null>;
  update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null>;
  delete(id: string): Promise<boolean>;
}
