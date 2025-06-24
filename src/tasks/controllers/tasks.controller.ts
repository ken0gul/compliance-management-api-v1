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
  Inject,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse as SwaggerApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { Task } from '../entities/task.entity';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/entities/user.entity';
import { ApiResponse } from '../../shared/responses/api-response';
import { ITaskDomainService } from '../interfaces/task-domain-service.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@ApiTags('Tasks')
@ApiBearerAuth("JWT-auth")
@Roles(UserRole.ADMIN, UserRole.STANDARD) 
@UseGuards(JwtAuthGuard, RolesGuard)

@Controller('tasks')
export class TasksController {
  constructor(
  @Inject('ITaskDomainService')
    private readonly taskDomainService: ITaskDomainService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new compliance task' })
  @ApiBody({ type: CreateTaskDto })
  @SwaggerApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task has been successfully created.',
    type: Task,
  })
  @SwaggerApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access!!',
  })
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<ApiResponse<Task>> {
    const task = await this.taskDomainService.createTask(createTaskDto);
    return ApiResponse.success('Task created successfully', task);
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
  @SwaggerApiResponse({
    status: HttpStatus.OK,
    description: 'List of tasks retrieved successfully.',
    type: [Task],
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async getAllTasks(
    @Query('framework') framework?: string,
    @Query('category') category?: string,
  ): Promise<ApiResponse<Task[]>> {
    const tasks = await this.taskDomainService.getAllTasks(framework, category);
    return ApiResponse.success('Tasks retrieved successfully', tasks);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a compliance task by ID' })
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @SwaggerApiResponse({
    status: HttpStatus.OK,
    description: 'Task retrieved successfully.',
    type: Task,
  })
  @SwaggerApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async getTaskById(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<Task>> {
    const task = await this.taskDomainService.getTaskById(id);
    return ApiResponse.success('Task retrieved successfully', task);
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
  @SwaggerApiResponse({
    status: HttpStatus.OK,
    description: 'Task has been successfully updated.',
    type: Task,
  })
  @SwaggerApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @SwaggerApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async updateTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<ApiResponse<Task>> {
    const task = await this.taskDomainService.updateTask(id, updateTaskDto);
    return ApiResponse.success('Task updated successfully', task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a compliance task' })
  @Roles(UserRole.ADMIN) // Sadece burasi adminde kalsin// Role-based admin-standard user farki test icin//
  @ApiParam({
    name: 'id',
    description: 'Task UUID',
    format: 'uuid',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @SwaggerApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Task has been successfully deleted.',
  })
  @SwaggerApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found.',
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access.',
  })
  async deleteTask(@Param('id', ParseUUIDPipe) id: string): Promise<ApiResponse<null>> {
    await this.taskDomainService.deleteTask(id);
    return ApiResponse.success('Task deleted successfully');
  }
}
