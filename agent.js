'use strict';

const { createSequelizeInstance } = require('./libs');
const assert = require('assert');

class AgentBootHook {
  constructor(agent) {
    this.agent = agent;
    this.config = agent.config;
  }

  async didLoad() {
    const { config, agent } = this;
    assert(config.sequelize != null && typeof config.sequelize === 'object', '[@142vip/egg-sequelize] 缺少sequelize配置，插件无法加载');

    assert(typeof config.sequelize.agent === 'boolean', '[@142vip/egg-sequelize] agent字段配置为true或者false');

    if (config.sequelize.agent) {
      await agent.addSingleton('sequelize', await createSequelizeInstance);
    }
  }


}

module.exports = AgentBootHook;
