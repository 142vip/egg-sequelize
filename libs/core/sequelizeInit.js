'use strict';
const sleep = require('mz-modules/sleep');
const path = require('path');
const DB_AUTH_RETRIES = Symbol('DBAuthenticate#Retries');
const MaxRetryCount = 10;

class SequelizeInit {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.logger = app.coreLogger;
  }


  /**
   * 加载数据库模型
   * @param databaseConfig 数据库配置
   */
  async loadDataBaseModel() {
    const { app, config } = this;

    // sequelize模块版本
    app.sequelize = config.Sequelize || require('sequelize');
    const { username, password, database, options } = config;
    // 实例化sequelize对象
    const sequelize = new app.sequelize(database, username, password, options);

    const delegateArr = config.delegate.split('.');
    const delegateLen = delegateArr.length;

    let model = app;
    let context = app.context;
    for (let i = 0; i < delegateLen - 1; i++) {
      model = model[delegateArr[i]] = model[delegateArr[i]] || {};
      context = context[delegateArr[i]] = context[delegateArr[i]] || {};
    }

    if (model[delegateArr[delegateLen - 1]]) {
      throw new Error(`[egg-sequelize] app[${config.delegate}] is already defined`);
    }

    // 将sequelize对象，挂载到ctx.model中，方便使用原生方法
    Object.defineProperty(model, delegateArr[delegateLen - 1], {
      value: sequelize,
      writable: false,
      configurable: true,
    });


    const DELEGATE = Symbol(`context#sequelize_${config.delegate}`);
    Object.defineProperty(context, delegateArr[delegateLen - 1], {
      get() {
        // context.model is different with app.model
        // so we can change the properties of ctx.model.xxx
        if (!this[DELEGATE]) {
          this[DELEGATE] = Object.create(model[delegateArr[delegateLen - 1]]);
          this[DELEGATE].ctx = this;
        }
        return this[DELEGATE];
      },
      configurable: true,
    });


    await this.loadModelFileToApp(path.join(app.baseDir, 'app', config.baseDir), app.sequelize);
    // 深拷贝
    Object.assign(model[delegateArr[delegateArr - 1]], app[config.delegate]);

    // sequelize 连接对象
    return model[delegateArr[delegateArr - 1]];
  }


  /**
   * 加载模型文件到app对象上，通过this.app.model.xxx使用
   * @param modelDir  数据库模型文件目录路径
   * @param sequelize sequelize实例
   */
  async loadModelFileToApp(modelDir, sequelize) {
    const { app, config } = this;
    const models = [];
    app.loader.loadToApp(modelDir, config.delegate, {
      caseStyle: 'upper',
      ignore: config.exclude,
      filter(model) {
        if (!model || !model.sequelize) return false;
        models.push(model);
        return true;
      },
      initializer(factory) {
        if (typeof factory === 'function') {
          return factory(app, sequelize);
        }
      },
    });

    // 执行表关联关系
    models.forEach(model => {
      typeof model.associate === 'function' && model.associate();
    });
  }

  /**
   * 连接认证
   * - 支持重试
   * - 每次重试休眠1s
   * @databaseConnection sequelize连接对象
   */
  async databaseAuthenticate(sequelizeConnection) {
    sequelizeConnection[DB_AUTH_RETRIES] = sequelizeConnection[DB_AUTH_RETRIES] || 0;
    try {
      await sequelizeConnection.authenticate();
    } catch (error) {

      if (sequelizeConnection[DB_AUTH_RETRIES] >= MaxRetryCount) throw error;

      this.logger.warn(`[@142vip/egg-sequelize] Sequelize Error: ${error.message}, sleep 1 seconds to retry...`);
      // 休眠1s，重试次数+1，默认最大10次 避免项目启动失败
      await sleep(1000);
      sequelizeConnection[DB_AUTH_RETRIES] += 1;
      await this.databaseAuthenticate(sequelizeConnection);
    }
  }
}

module.exports = SequelizeInit;
