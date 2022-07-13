'use strict';
const mysql = require('mysql2');

class Database {
  constructor(app) {
    this.app = app;
    this.logger = app.coreLogger;
    this.config = app.config;
  }

  /**
     * 数据库不存在时，自动创建数据库
     */
  async create() {
    const { username, password, host, port, database } = this.config;
    const creatDataBaseSql = `CREATE DATABASE IF NOT EXISTS ${database} ` +
            'default charset utf8 COLLATE utf8_general_ci';
    const connection = await mysql.createConnection({
      host, port,
      user: username, password,
    });
    // 执行sql
    try {
      await connection.execute(creatDataBaseSql);
      this.logger.info('[@142vip/egg-sequelize] 创建失败');
    } catch (e) {
      this.logger.error('[@142vip/egg-sequelize] 创建失败');
    }
  }
}

module.exports = Database;
