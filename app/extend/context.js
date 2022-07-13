'use strict';
const sequelizeInstance = Symbol('Context#sequelizeInstance');

module.exports = {
  // 扩展ctx.sequelize
  get sequelize() {
    if (!this[sequelizeInstance]) {
      this[sequelizeInstance] = this.app.sequelize;
    }
    return this[sequelizeInstance];
  },
};
