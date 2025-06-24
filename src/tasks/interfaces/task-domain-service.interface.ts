import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';

export interface ITaskDomainService {
  createTask(dto: CreateTaskDto): Promise<Task>;
  getAllTasks(framework?: string, category?: string): Promise<Task[]>;
  getTaskById(id: string): Promise<Task>;
  updateTask(id: string, dto: UpdateTaskDto): Promise<Task>;
  deleteTask(id: string): Promise<void>;
}
