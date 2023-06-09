import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  migrationsRun: true,
  entities: ['dist/app/**/*.entity.js'],
  migrationsTableName: 'typeorm_migrations',
  migrations: ['dist/database/migrations/**/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
