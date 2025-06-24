import { Controller, Post, Body, HttpStatus, Get, UseGuards, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse as SwaggerApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, AuthResult } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';
import { ApiResponse } from '../shared/responses/api-response';
import { IUserRepository } from './interfaces/user-repository.interface';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @SwaggerApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully authenticated',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'JWT access token',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
            username: { type: 'string', example: 'admin' },
            email: { type: 'string', example: 'admin@compliance.com' },
            firstName: { type: 'string', example: 'System' },
            lastName: { type: 'string', example: 'Administrator' },
            role: { type: 'string', example: 'admin' },
          },
        },
      },
    },
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse<AuthResult>> {
    const authResult = await this.authService.login(loginDto);
    return ApiResponse.success('User authenticated successfully', authResult);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @SwaggerApiResponse({
    status: HttpStatus.OK,
    description: 'List of all users retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
          username: { type: 'string', example: 'admin' },
          email: { type: 'string', example: 'admin@compliance.com' },
          firstName: { type: 'string', example: 'System' },
          lastName: { type: 'string', example: 'Administrator' },
          role: { type: 'string', example: 'admin' },
          isActive: { type: 'boolean', example: true },
          createdAt: { type: 'string', example: '2025-06-24T22:33:28.000Z' },
          updatedAt: { type: 'string', example: '2025-06-24T22:33:28.000Z' },
        },
      },
    },
  })
  @SwaggerApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @SwaggerApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  async getAllUsers(): Promise<ApiResponse<any[]>> {
    const users = await this.userRepository.getAllUsers();
    return ApiResponse.success('Users retrieved successfully', users);
  }
}
