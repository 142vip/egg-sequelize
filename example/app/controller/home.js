'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    console.log(Object.keys(app.model));
    console.log(ctx.sequelize === app.sequelize, ctx.model === app.model);
    console.log(Object.keys(ctx.model), Object.keys(app.model), await ctx.model.User.findAll(), Object.getOwnPropertyNames(ctx.model.__proto__));
    console.log(await app.sequelize.query('select 1'));
    ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
