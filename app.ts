import { Application, IBoot } from 'egg';
import MakeResponse from './utils/makeResponse';

export default class FooBoot implements IBoot {
  private readonly app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  configDidLoad() {
    // Config, plugin files have loaded.
  }

  async didLoad() {
    // All files have loaded, start plugin here.
    if (this.app.config.env === 'local' || this.app.config.env === 'unittest') {
      await this.app.model.sync({ force: true });
    }
    this.app.makeCommonResponse = MakeResponse.makeCommonResponse;
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    const commands = [
      'JSON.DEL',
      'JSON.GET',
      'JSON.MGET',
      'JSON.SET',
      'JSON.TYPE',
      'JSON.NUMINCRBY',
      'JSON.NUMMULTBY',
      'JSON.STRAPPEND',
      'JSON.STRLEN',
      'JSON.ARRAPPEND',
      'JSON.ARRINDEX',
      'JSON.ARRINSERT',
      'JSON.ARRLEN',
      'JSON.ARRPOP',
      'JSON.ARRTRIM',
      'JSON.OBJKEYS',
      'JSON.OBJLEN',
      'JSON.DEBUG',
      'JSON.FORGET',
      'JSON.RESP',
    ];
    for (const command of commands) {
      console.log(`Hook build in command: ${command}`);
      this.app.redis.addBuiltinCommand(command);
    }
  }

  async serverDidReady() {
    // Server is listening.
  }

  async beforeClose() {
    // Do some thing before app close.
  }
}
