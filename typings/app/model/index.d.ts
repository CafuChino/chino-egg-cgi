// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportUser = require('../../../app/model/user');

declare module 'egg' {
  interface IModel {
    User: ReturnType<typeof ExportUser>;
  }
}
