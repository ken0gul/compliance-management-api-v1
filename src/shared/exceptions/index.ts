import { HttpException, HttpStatus } from '@nestjs/common';

export class TaskNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Task with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}

export class InvalidTaskStatusException extends HttpException {
  constructor(status: string) {
    super(`Invalid task status: ${status}`, HttpStatus.BAD_REQUEST);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = 'Unauthorized access') {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden access') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
