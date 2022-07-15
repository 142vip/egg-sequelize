## egg-sequelize插件使用示例



## 快速开始

```js
// config.default.js

'use strict';

module.exports = () => {
    const config = {};
    config.keys = 'fairy sister so cute';

    config.sequelize = {
        client: {
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
                // logging(...args) {
                //   // if benchmark enabled, log used
                //   const used = typeof args[1] === 'number' ? `(${args[1]}ms)` : '';
                //   app.coreLogger.info('[@142vip/egg-sequelize]%s %s', used, args[0]);
                // },
                // timezone: 'Asia/Shanghai',
                pool: {
                    maxConnections: 5,
                },
            },
        },
        app: true,
        agent: false,
    };

    return config;
};







```
开启插件

```js
module.exports = {
  sequelize: {
    enable: true,
    package: '@142vip/egg-sequelize',
  },
};

```

### 运行

```bash
## 下载依赖
npm i
## 运行项目
npm run dev
## 浏览器查看
open http://localhost:7001/
```



### 常用方式

调用model方式

- ctx.model.xxx
- app.model.xxx
- ctx.model.User.findAll()
- ctx.model.User.find()
- ...

自定义查询

- ctx.model.query("select 1")
- ctx.model.sync()
...