'use strict';
const database = require('./core/database');
const sequelizeInit = require('./core/sequelizeInit');

/**
 * 创建sequelize数据库连接实例
 * @param config 连接配置，详细配置参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
 * @param app egg框架下的application对象
 */
async function createSequelizeInstance(config, app) {
  const defaultConfig = {
    username: 'root',
    password: '123456',
    database: '142vip_db_test',
    delegate: 'model',
    baseDir: 'model',
    exclude: '', // 支持数组或者字符串
    Sequelize: require('sequelize'), // 指定Sequelize模块版本
    // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
    options: {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      benchmark: true,
      define: {
        freezeTableName: false,
        underscored: true,
      },
      // 是否开启日志，默认false,支持自定义
      logging(...args) {
        // if benchmark enabled, log used
        const used = typeof args[1] === 'number' ? `(${args[1]}ms)` : '';
        app.logger.info('[@142vip/egg-sequelize]%s %s', used, args[0]);
      },
      timezone: 'Asia/Shanghai',
      pool: {
        maxConnections: 5,
      },
    },
  };
  app.config = Object.assign({}, defaultConfig, config);

  const { options } = config;


  // 提前创建好数据库 支持mysql
  if (options != null && options.dialect === 'mysql') {
    await new database(app).create();
  }
  const sequelizeInstance = new sequelizeInit(app);

  const sequelizeConnection = sequelizeInstance.loadDataBaseModel();
  // 重试
  await sequelizeInstance.databaseAuthenticate(sequelizeConnection);

  // 返回sequelize对象，绑定到this.app对象上
  return sequelizeConnection;
}


module.exports = {
  createSequelizeInstance,
};
