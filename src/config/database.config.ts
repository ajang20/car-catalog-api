import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: Number.parseInt(process.env.DATABASE_PORT || '5342', 10),
  username: process.env.DATABASE_NAME || 'postgres',
  password: process.env.DATABASE_PASSWORD || '',
  database: process.env.DATABASE_DATABASE || 'porstgres',
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV !== 'production',
}));
