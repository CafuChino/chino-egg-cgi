import { EggAppConfig, PowerPartial } from 'egg';
import { Options } from 'sequelize';
import databaseConfig from '../database/config.json';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: {
      host: databaseConfig.development.host,
      username: databaseConfig.development.username,
      password: databaseConfig.development.password,
      database: databaseConfig.development.database,
      dialect: databaseConfig.development.dialect as Options['dialect'],

    },
    redis: {
      client: {
        port: 6379, // Redis port
        host: '127.0.0.1', // Redis host
        password: '',
        db: 0,
      },
    },
  };
  return config;
};
