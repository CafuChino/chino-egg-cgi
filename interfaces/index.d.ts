import 'egg';
import 'IORedis'
import * as Sentry from '@sentry/node';
import MakeResponse from '../utils/makeResponse';

declare module 'IORedis' {
  export interface Redis {
    addBuiltinCommand: Function;
  }
}
declare module 'egg' {
  export interface Application {
    makeCommonResponse: MakeResponse.makeCommonResponse;
    makeErrorResponse: MakeResponse.makeErrorResponse;
    redis: Redis & Singleton<Redis>;
    sentry: Sentry;
  }
}
