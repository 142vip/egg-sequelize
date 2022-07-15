'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    console.log(Object.keys(app.model));
    // console.log(ctx.sequelize === app.sequelize, ctx.model === app.model);
    // console.log(Object.keys(ctx.model), Object.keys(app.model), await ctx.model.User.findAll(), Object.getOwnPropertyNames(ctx.model.__proto__));
    // 自定义查询
    await app.sequelize.query('select 1');
    await app.model.query('select 1');
    // 表同步
    app.model.sync();
    ctx.body = {
      ctx: !!ctx.model,
      app: !!app.model,
      ctx_model_keys: Object.keys(ctx.model.__proto__),
      app_model_keys: Object.keys(app.model),
    };
  }
}

module.exports = HomeController;
