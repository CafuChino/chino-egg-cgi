import { Controller } from 'egg';

export default class HomeController extends Controller {
  public async index() {
    const { app, ctx } = this;
    app.makeCommonResponse(ctx, 200, await ctx.service.test.sayHi('Chino'), {});
  }

  public async throwError() {
    const { app, ctx } = this;
    app.makeCommonResponse(ctx, 200, await ctx.service.test.throwError(), {});
  }
}
