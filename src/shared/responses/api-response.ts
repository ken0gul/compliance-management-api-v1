import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty({ example: true, description: 'Indicates if the request was successful' })
  success: boolean;

  @ApiProperty({ example: 'Operation completed successfully', description: 'Response message' })
  message: string;

  @ApiProperty({ description: 'Response data' })
  data?: T;

  @ApiProperty({ 
    example: { 
      timestamp: '2025-06-25T10:00:00.000Z', 
      path: '/api/v1/tasks',
      method: 'GET'
    }, 
    description: 'Request metadata',
    required: false 
  })
  meta?: {
    timestamp: string;
    path?: string;
    method?: string;
    total?: number;
    page?: number;
    limit?: number;
  };

  @ApiProperty({ 
    example: null, 
    description: 'Error details (only present when success is false)',
    required: false 
  })
  error?: {
    code: string;
    details?: any;
  };

  constructor(
    success: boolean,
    message: string,
    data?: T,
    meta?: ApiResponse<T>['meta'],
    error?: ApiResponse<T>['error']
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.error = error;
  }

  static success<T>(
    message: string = 'Operation completed successfully',
    data?: T,
    meta?: ApiResponse<T>['meta']
  ): ApiResponse<T> {
    return new ApiResponse(true, message, data, meta);
  }

  static error<T = any>(
    message: string = 'Operation failed',
    error?: ApiResponse<T>['error'],
    meta?: ApiResponse<T>['meta']
  ): ApiResponse<T> {
    return new ApiResponse<T>(false, message, undefined as T, meta, error);
  }
}

export class PaginatedApiResponse<T> extends ApiResponse<T[]> {
  @ApiProperty({ description: 'Pagination metadata' })
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };

  constructor(
    success: boolean,
    message: string,
    data: T[],
    pagination: PaginatedApiResponse<T>['pagination'],
    meta?: ApiResponse<T[]>['meta']
  ) {
    super(success, message, data, meta);
    this.pagination = pagination;
  }


}
