'use strict';
const { createSequelizeInstance } = require('./libs');
const assert = require('assert');

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.config = app.config;
  }
  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    const { config, app } = this;

    assert(config.sequelize != null && typeof config.sequelize === 'object', '[@142vip/egg-sequelize] 缺少sequelize配置，插件无法加载');

    assert(typeof config.sequelize.app === 'boolean', '[@142vip/egg-sequelize] app字段配置为true或者false');

    if (config.sequelize.app) {
      await app.addSingleton('sequelize', await createSequelizeInstance);
    }
  }


}

module.exports = AppBootHook;
