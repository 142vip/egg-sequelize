'use strict';

const { createSequelizeInstance } = require('./libs');
const assert = require('assert');

class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
    this.config = agent.config;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用

  }

  async didLoad() {
    const { config, agent } = this;
    assert(config.sequelize != null && typeof config.sequelize === 'object', '[@142vip/egg-sequelize] 缺少sequelize配置');

    assert(typeof config.sequelize.app === 'boolean', '[@142vip/egg-sequelize] app为true或者false');

    if (config.sequelize.agent) {
      await agent.addSingleton('sequelize', await createSequelizeInstance);
    }
  }


}

module.exports = AgentBootHook;
