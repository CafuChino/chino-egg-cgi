import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1625927394590_4735';

  // add your egg config in here
  config.middleware = [ 'sentryTraceMiddleware' ];

  config.onerror = {
    all(err, ctx) {
      ctx.app.sentry.withScope(scope => {
        scope.addEventProcessor(event => {
          return ctx.app.sentry.Handlers.parseRequest(event, ctx.request);
        });
        ctx.app.sentry.captureException(err);
      });
      ctx.body = 'error';
      ctx.status = 500;
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    sentry: {
      dsn: 'https://964dcc317f264b81b3ae320436c7abe7@o914936.ingest.sentry.io/6261111',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
