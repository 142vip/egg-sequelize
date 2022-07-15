'use strict';

// 插件默认配置
exports.sequelize = {
  // 单个客户端
  // client: {
  //   username: 'root',
  //   password: '123456',
  //   database: '142vip_db_test',
  //   delegate: 'model',
  //   baseDir: 'model', // 数据库模型存放的目录
  //   exclude: '', // 支持数组或者字符串
  //   Sequelize: require('sequelize'), // 指定Sequelize模块版本
  //   // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
  // },
  // 支持多客户端 ctx.sequelize.get('fairy_sister').xxxx
  // clients: {
  //   younger_sister: {
  //     username: 'root',
  //     password: '123456',
  //     database: '142vip_db_test',
  //     delegate: 'young_model',
  //     baseDir: 'model', // 数据库模型存放的目录
  //     exclude: '', // 支持数组或者字符串
  //     Sequelize: require('sequelize'), // 指定Sequelize模块版本
  //     // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
  //   },
  //   fairy_sister: {
  //     username: 'root',
  //     password: '123456',
  //     database: '142vip_db_test',
  //     delegate: 'fairy_model',
  //     baseDir: 'model', // 数据库模型存放的目录
  //     exclude: '', // 支持数组或者字符串
  //     Sequelize: require('sequelize'), // 指定Sequelize模块版本
  //     // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
  //   },
  // },
  app: true,
  agent: false,
};
