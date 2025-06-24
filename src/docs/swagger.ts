import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupSwagger(app: INestApplication) {
  const configService = app.get(ConfigService);
  
  const config = new DocumentBuilder()
    .setTitle(configService.get<string>('swagger.title') || 'Compliance Management API')
    .setDescription(configService.get<string>('swagger.description') || 'Enterprise-grade compliance task management system')
    .setVersion(configService.get<string>('swagger.version') || '1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', 
    )
    .addTag('Authentication', 'User authentication endpoints')
    .addTag('Tasks', 'Compliance task management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs/v1/swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
}
