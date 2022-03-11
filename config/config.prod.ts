import { EggAppConfig, PowerPartial } from 'egg';
import databaseConfig from '../database/config.json';
import { Options } from 'sequelize';


export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      host: process.env.EGG_DB_HOST || databaseConfig.production.host,
      username: process.env.EGG_DB_USER || databaseConfig.production.username,
      password: process.env.EGG_DB_PASS || databaseConfig.production.password,
      database: process.env.EGG_DB_DATABASE || databaseConfig.production.database,
      dialect: process.env.EGG_DB_DIALECT as Options['dialect'] || databaseConfig.production.dialect as Options['dialect'],
    },
    redis: {
      client: {
        port: Number(process.env.EGG_REDIS_PORT) || 6379, // Redis port
        host: process.env.EGG_REDIS_HOST || '127.0.0.1', // Redis host
        password: process.env.EGG_REDIS_PASS || '',
        db: Number(process.env.EGG_REDIS_DB) || 0,
      },
    },
  };
  return config;
};
