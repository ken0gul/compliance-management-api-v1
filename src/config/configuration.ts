import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'compliance_user',
  password: process.env.DATABASE_PASSWORD || 'compliance_password',
  database: process.env.DATABASE_NAME || 'compliance_db',
}));

export const jwtConfig = registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET || 's3cR3t!@#Z8vWmL2qXnA9bR$Tp1YgJc7Ku0fD',
  expiresIn: process.env.JWT_EXPIRES_IN || '24h',
}));

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  apiPrefix: process.env.API_PREFIX || 'api',
  apiVersion: process.env.API_VERSION || 'v1',
}));

export const swaggerConfig = registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'Compliance Management API',
  description: process.env.SWAGGER_DESCRIPTION || 'Enterprise-grade compliance task management system',
  version: process.env.SWAGGER_VERSION || '1.0.0',
}));
