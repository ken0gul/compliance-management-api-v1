import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
export class CreateTaskCommand {
  constructor(public readonly createTaskDto: CreateTaskDto) {}
}

export class UpdateTaskCommand {
  constructor(
    public readonly id: string,
    public readonly updateTaskDto: UpdateTaskDto,
  ) {}
}

export class DeleteTaskCommand {
  constructor(public readonly id: string) {}
}