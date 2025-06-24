import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { TaskDomainService } from '../services/task-domain.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';

@ApiTags('Tasks')
@ApiBearerAuth("JWT-auth")
@Roles(UserRole.ADMIN, UserRole.STANDARD) 
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskDomainService: TaskDomainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new compliance task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task has been successfully created.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access!!',
  })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskDomainService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all compliance tasks with optional filtering' })
  @ApiQuery({
    name: 'framework',
    required: false,
    description: 'Filter by compliance framework',
    example: 'DSALTA',
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description: 'Filter by task category',
    example: 'Access Control',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of tasks retrieved successfully.',
    type: [Task],
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async getAllTasks(
    @Query('framework') framework?: string,
    @Query('category') category?: string,
  ): Promise<Task[]> {
    return await this.taskDomainService.getAllTasks(framework, category);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a compliance task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task retrieved successfully.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<Task> {
    return await this.taskDomainService.getTaskById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a compliance task' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task has been successfully updated.',
    type: Task,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return await this.taskDomainService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a compliance task' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task has been successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.taskDomainService.deleteTask(id);
  }
}
