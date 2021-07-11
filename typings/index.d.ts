import 'egg';
import 'IORedis'
import MakeResponse from '../utils/makeResponse';
declare module 'egg' {
  export interface Application {
    makeCommonResponse: MakeResponse.makeCommonResponse
  }
}
declare module 'IORedis' {
  interface Redis {
    addBuiltinCommand: Function
  }
}

