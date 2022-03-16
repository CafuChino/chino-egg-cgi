import { extractTraceparentData, stripUrlQueryAndFragment } from '@sentry/tracing';
import { Context } from 'egg';

export default function sentryTraceMiddleware(): any {
  return async (ctx: Context, next: () => Promise<any>) => {
    const reqMethod = (ctx.method || '').toUpperCase();
    const reqUrl = ctx.url && stripUrlQueryAndFragment(ctx.url);
    const Sentry = ctx.app.sentry;

    // connect to trace of upstream app
    let traceparentData;
    if (ctx.request.get('sentry-trace')) {
      traceparentData = extractTraceparentData(ctx.request.get('sentry-trace'));
    }

    const transaction = Sentry.startTransaction({
      name: `${reqMethod} ${reqUrl}`,
      op: 'http.server',
      ...traceparentData,
    });

    ctx.__sentry_transaction = transaction;

    // We put the transaction on the scope so users can attach children to it
    Sentry.getCurrentHub().configureScope(scope => {
      scope.setSpan(transaction);
    });

    ctx.res.on('finish', () => {
    // Push `transaction.finish` to the next event loop so open spans have a chance to finish before the transaction closes
      setImmediate(() => {
      // if using koa router, a nicer way to capture transaction using the matched route
        if (ctx._matchedRoute) {
          const mountPath = ctx.mountPath || '';
          transaction.setName(`${reqMethod} ${mountPath}${ctx._matchedRoute}`);
        }
        transaction.setHttpStatus(ctx.status);
        transaction.finish();
      });
    });

    await next();
  };
}
