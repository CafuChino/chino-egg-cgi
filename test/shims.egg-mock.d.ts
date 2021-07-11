import { factory } from 'factory-girl';
import { MockApplication } from 'egg-mock/bootstrap';
declare module 'egg-mock' {
  export interface MockApplication {
    factory: factory
  }
}
