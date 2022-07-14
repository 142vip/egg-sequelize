'use strict';
const { STRING, BIGINT } = require('sequelize');
module.exports = app => {
  console.log(app.sequelize, app.model);
  return app.sequelize.define('user', {
    id: {
      filed: 'id',
      type: BIGINT(10),
      primaryKey: true,
      autoIncrement: true,
      comment: '反馈信息主键',
    },
    name: {
      filed: 'name',
      type: STRING(60),
      allowNull: true,
      comment: '用户名',
    },
    create_time: {
      filed: 'create_time',
      type: BIGINT(13),
      allowNull: false,
      comment: '创建时间',
    },
    delete_time: {
      filed: 'delete_time',
      type: BIGINT(13),
      allowNull: false,
      defaultValue: 0,
      comment: '删除时间',
    },
  }, {
    // 指定数据库中对应的tbl_feed_back表
    tableName: 'tbl_feed_back',
    freezeTableName: false,
    // 是否自动添加时间戳createAt，updateAt
    timestamps: false,
  });
};
