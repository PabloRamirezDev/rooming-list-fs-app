import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  synchronize: false,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./db/migrations/*.ts'],
  migrationsTableName: 'migrations',
});
