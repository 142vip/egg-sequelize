'use strict';
const sleep = require('mz-modules/sleep');
const DB_AUTH_RETRIES = Symbol('DBAuthenticate#Retries');
const MaxRetryCount = 10;

class Sequelize {
  constructor(app) {
    this.app = app;
    this.config = app.config;
    this.logger = app.coreLogger;
  }

  async getDataBaseConfig() {
    const config = this.config.sequelize;

  }

  /**
     * 加载数据库模型
     */
  async loadDataBaseModel(databaseConfig) {
    const { app } = this;
    const { connectionUri, username, password, database } = databaseConfig;
    // 实例化sequelize对象
    const sequelize = connectionUri != null ? new app.Sequelize(connectionUri, databaseConfig) :
      new app.Sequelize(database, username, password, databaseConfig);

  }

  /**
     * 连接认证
     * - 支持重试
     * - 每次重试休眠1s
     * @databaseConnection sequelize连接对象
     */
  async databaseAuthenticate(databaseConnection) {
    databaseConnection[DB_AUTH_RETRIES] = databaseConnection[DB_AUTH_RETRIES] || 0;

    try {
      await databaseConnection.authenticate();
    } catch (error) {
      if (databaseConnection[DB_AUTH_RETRIES] >= MaxRetryCount) throw error;

      this.logger.warn(`[@142vip/egg-sequelize] Sequelize Error: ${error.message}, sleep 1 seconds to retry...`);
      // 休眠1s，重试次数+1，默认最大10次
      await sleep(1000);
      databaseConnection[DB_AUTH_RETRIES] += 1;
      await this.databaseAuthenticate(databaseConnection);
    }
  }
}

module.exports = Sequelize;
