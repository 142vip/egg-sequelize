'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  /**
   * 添加记录
   */
  async create() {
    const { ctx } = this;
    const { name } = ctx.request.body;

    const user = await ctx.model.User.findOne({
      name,
    });
    if (user == null) {
      ctx.body = { code: 200, message: '已存在' };
    }
    await ctx.model.User.create({
      name,
      create_time: new Date().getTime(),
    });
    ctx.body = { code: 200, message: '添加成功', result: true };
  }


  async update() {
    const { ctx } = this;
    const { id, name } = ctx.request.body;

    await ctx.model.User.update({ name }, { id });
    ctx.body = { code: 200, message: '更新成功', result: true };
  }

  /**
   * 查询单条记录
   * @return {Promise<void>}
   */
  async findOne() {
    const { ctx } = this;
    const { name } = ctx.query;
    const result = await ctx.model.User.findOne({ name });
    ctx.body = { code: 200, message: '查询成功', result };
  }

  /**
   * 查询列表
   */
  async findList() {
    const { ctx } = this;
    const userList = await this.ctx.model.User.findAll();
    ctx.body = { code: 200, messages: '查询成功', result: userList };
  }

  /**
   * 删除
   */
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const user = await ctx.model.User.findOne({ id });
    if (user == null) {
      ctx.body = { code: 200, message: '信息不存在', result: false };
      return;
    }
    // 存在，硬删除
    await ctx.model.User.destroy({ id });

    ctx.body = { code: 200, message: '删除成功', result: true };
  }
}

module.exports = UserController;
