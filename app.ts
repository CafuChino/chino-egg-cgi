import { Application, IBoot } from 'egg';
import MakeResponse from './utils/makeResponse';
import * as Sentry from '@sentry/node';
import lodash from 'lodash';

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
    Sentry.init({ dsn: this.app.config.sentry.dsn, tracesSampleRate: this.app.config.env === 'prod' ? 1.0 : 1 });
  }

  async willReady() {
    // All plugins have started, can do some thing before app ready.
  }

  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    const sentryEnabled = lodash.get(this.app.config, 'sentry.enabled', false);
    const DSN = lodash.get(this.app.config, 'sentry.DSN', null);
    if (!sentryEnabled) {
      console.log('Sentry Disabled');
    }
    if (!DSN && sentryEnabled) {
      console.log('Sentry DSN missing!');
      return;
    }
    const options = {
      dsn: DSN,
      tracesSampleRate: 1.0,
      beforeSend: event => {
        return this.app.config.env !== 'prod' && sentryEnabled ? null : event;
      },
    };
    Sentry.init(options);
    this.app.sentry = Sentry;
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
