import 'egg';
import 'IORedis'
import MakeResponse from '../utils/makeResponse';
declare module "IORedis" {
  export interface Redis {
    addBuiltinCommand: Function;
  }
}
declare module "egg" {
  export interface Application {
    makeCommonResponse: MakeResponse.makeCommonResponse;
    makeErrorResponse: MakeResponse.makeErrorResponse;
    redis: Redis & Singleton<Redis>;
  }
}

