import { Controller, Post, Body, HttpStatus, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, AuthResult } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<AuthResult> {
    return await this.authService.login(loginDto);
  }

  @Get('users')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiResponse({
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
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized access',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Forbidden - Admin role required',
  })
  async getAllUsers() {
    return await this.userRepository.getAllUsers();
  }
}
