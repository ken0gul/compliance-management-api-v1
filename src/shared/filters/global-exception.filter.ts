import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../responses/api-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorCode = 'INTERNAL_ERROR';
    let details: any = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      
      if (typeof errorResponse === 'string') {
        message = errorResponse;
      } else if (typeof errorResponse === 'object' && errorResponse !== null) {
        const errorObj = errorResponse as any;
        message = errorObj.message || exception.message;
        details = errorObj.message !== errorObj ? errorObj : undefined;
        errorCode = errorObj.error || 'HTTP_ERROR';
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      errorCode = 'APPLICATION_ERROR';
    }

    const meta = {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
    };

    const errorResponse = ApiResponse.error(
      message,
      {
        code: errorCode,
        details,
      },
      meta
    );

    response.status(status).json(errorResponse);
  }
}
