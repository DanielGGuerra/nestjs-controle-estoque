import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
  migrationsTableName: 'typeorm_migrations',
  migrations: ['dist/database/migrations/**/*.js'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
