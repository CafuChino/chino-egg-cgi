import { EggAppConfig, PowerPartial } from 'egg';
import { EggSequelizeOptions } from 'egg-sequelize';
import databaseConfig from '../database/config.json';


export default () => {
  const config: PowerPartial<EggAppConfig> = {
    sequelize: { ...databaseConfig.test as EggSequelizeOptions },
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
