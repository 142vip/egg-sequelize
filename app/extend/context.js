'use strict';

const sequelizeInstance = Symbol('Context#sequelizeInstance');
module.exports = {
  // 扩展ctx.sequelize 支持多用例，ctx.sequelize.get('xxxx')=== ctx.[xxxx]
  get sequelize() {
    if (!this[sequelizeInstance]) {
      this[sequelizeInstance] = this.app.sequelize;
    }
    return this[sequelizeInstance];
  },
};
