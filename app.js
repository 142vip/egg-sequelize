'use strict';


const { createSequelizeInstance } = require('./libs');
const assert = require('assert');

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.config = app.config;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务
    const { config, app } = this;

    assert(config.sequelize != null && typeof config.sequelize === 'object', '[@142vip/egg-sequelize] 缺少sequelize配置');

    assert(typeof config.sequelize.app === 'boolean', '[@142vip/egg-sequelize] app为true或者false');

    if (config.sequelize.app) {
      await app.addSingleton('sequelize', await createSequelizeInstance);
    }
  }


}

module.exports = AppBootHook;
