## @142vip/egg-sequelize

<p align="center">
<a href="https://space.bilibili.com/350937042" target="_blank"><img src="https://img.shields.io/badge/Bilibili-哔哩哔哩-green.svg"></a> 
<a href="https://142vip.cn" target="_blank"><img src="https://img.shields.io/badge/142vip-个人网站-orange.svg"></a>
<a href="https://yapi.142vip.cn" target="_blank"><img src="https://img.shields.io/badge/yapi-接口管理-8fe.svg"></a>
<a href="https://blog.142vip.cn" target="_blank"><img src="https://img.shields.io/badge/blog-我的博客-blue.svg"></a>
<a href="https://github.com/mmdapl" target="_blank"><img src="https://img.shields.io/badge/github-代码-9ac.svg"></a>
<a href="https://gitee.com/mmdapl" target="_blank"><img src="https://img.shields.io/badge/gitee-代码-4ed.svg"></a>
<a href="https://blog.csdn.net/Mmdapl" target="_blank"><img src="https://img.shields.io/badge/csdn-博客-8ea.svg"></a>


</p>

[//]: # (<p align="center">)

[//]: # ()
[//]: # ([![NPM version][npm-image]][npm-url])

[//]: # ([![Known Vulnerabilities][snyk-image]][snyk-url])

[//]: # ([![npm download][download-image]][download-url])

[//]: # ()
[//]: # (</p>)


[//]: # ([npm-image]: https://img.shields.io/npm/v/@142vip/egg-sequelize.svg?style=flat-square)

[//]: # ()
[//]: # ([npm-url]: https://npmjs.org/package/@142vip/egg-sequelize)

[//]: # ()
[//]: # ([travis-image]: https://img.shields.io/travis/eggjs/@142vip/egg-sequelize.svg?style=flat-square)

[//]: # ()
[//]: # ([travis-url]: https://travis-ci.org/eggjs/@142vip/egg-sequelize)

[//]: # ()
[//]: # ([codecov-image]: https://img.shields.io/codecov/c/github/eggjs/@142vip/egg-sequelize.svg?style=flat-square)

[//]: # ()
[//]: # ([codecov-url]: https://github.com/mmdapl/@142vip/egg-sequelize)

[//]: # ()
[//]: # ([david-image]: https://img.shields.io/david/eggjs/@142vip/egg-sequelize.svg?style=flat-square)

[//]: # ()
[//]: # ([david-url]: https://david-dm.org/eggjs/@142vip/egg-sequelize)

[//]: # ()
[//]: # ([snyk-image]: https://snyk.io/test/npm/@142vip/egg-sequelize/badge.svg?style=flat-square)

[//]: # ()
[//]: # ([snyk-url]: https://snyk.io/test/npm/@142vip/egg-sequelize)

[//]: # ()
[//]: # ([download-image]: https://img.shields.io/npm/dm/@142vip/egg-sequelize.svg?style=flat-square)

[//]: # ()
[//]: # ([download-url]: https://npmjs.org/package/@142vip/egg-sequelize)



Egg.js框架下Sequelize ORM插件支持，参考官方插件[egg-sequelize](https://github.com/eggjs/egg-sequelize) 开发，使用存在较大差异。实际使用请参考以下文档

### 支持的功能

- [x] 动态数据库表创建、数据动态部署
- [x] Sequelize ORM方法调用，原生SQL语句查询
- [x] 模型自动挂载、实例化sequelize对象
- [x] 多数据源配置连接、连接池，连接自动重试机制（重试10次，每次休眠1s）
- [x] app.js、agent.js 自定义挂载
- [x] 多种方式调用sequelize实例；高度适配sequelize模块

### 快速安装

```bash
## 最新版
npm install @142vip/egg-sequelize --save

## 指定版本
npm install @142vip/egg-sequlize@xxx --save

```

### 使用插件

```js
// {app_root}/config/plugin.js
exports.sequelize = {
    enable: true,
    package: '@142vip/egg-sequelize',
};
```

### 修改配置

例如，在默认环境下修改sequelize插件的配置

```js
// {app_root}/config/config.default.js
exports.sequelize = {
    client:{
        username: 'root',                   // 用户名，默认root
        password: '123456',                 // 密码，默认123456
        database: '142vip_db_test',         // 数据库名称，如果不存在会自动新建
        delegate: 'model',                  // 加载所有模型文件到app或者ctx对象上的属性，ctx[delegate]或者app[delegate] 默认：model
        baseDir: 'model',                   // 将app/${baseDir}目录下的文件加载到上面的delegate对象中，用做数据库表模型，默认：model目录下所有文件
        exclude: '',                        // 忽略模型目录下的文件，避免被加载到模型对选哪个中，支持字符串或者数组，例如：'index.js' ['index.js'..]
        Sequelize: require('sequelize'),    // 指定Sequelize模块版本
        // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
        options: {
            dialect: 'mysql',
            host: '127.0.0.1',              // 数据库主机地址，默认 127.0.0.1
            port: 3306,                     // 数据库端口，默认3306
            benchmark: true,
            define: {
                freezeTableName: false,
                underscored: true,
            },
            // 是否开启日志，默认false,支持自定义,benchmark为false时候生效
            logging(...args) {
                // if benchmark enabled, log used
                const used = typeof args[1] === 'number' ? `(${args[1]}ms)` : '';
                app.logger.info('[@142vip/egg-sequelize]%s %s', used, args[0]);
            },
            timezone: '+00:00',
            pool: {
                max: 5,
                idle: 30000,
                acquire: 60000,
            },
        },
    },
    app:true,
    agent:false
};
```


插件本身默认的连接配置，你可以自行配置进行覆盖，具体有：

```js
module.exports = {
    dialect: 'mysql',
    host: '127.0.0.1',              // 数据库主机地址，默认 127.0.0.1
    port: 3306,                     // 数据库端口，默认3306
    benchmark: true,
    define: {
        freezeTableName: false,
        underscored: true,
    },
    // 是否开启日志，默认false,支持自定义,benchmark为false时候生效
    logging(...args) {
        // if benchmark enabled, log used
        const used = typeof args[1] === 'number' ? `(${args[1]}ms)` : '';
        app.logger.info('[@142vip/egg-sequelize]%s %s', used, args[0]);
    },
    timezone: '+00:00',
    pool: {
        max: 5,
        idle: 30000,
        acquire: 60000,
    },
}
```

更多默认配置，可以查看配置文件[config/config.default.js](config/config.default.js) ，具体属性也可以参考[sequelize配置](https://github.com/sequelize/sequelize/blob/main/src/sequelize.js)

### 模型文件

在默认情况下，即config的配置中，baseDir字段为model。为方便egg-sequelize插件初始化，建议将所有的模型文件都放在模型默认文件目录`app/model`中；

#### 命名翻转

模型文件目录中的模型.js文件，在进行sequelize初始化后，默认情况下会挂载到app.model.xxx或者ctx.model.xxx中，但会根据文件名称的命名风格，进行自动转化。

规则参考如下：

| model file        | class name               |
| :---------------- | :----------------------- |
| `user.js`         | `app.model.User`         |
| `person.js`       | `app.model.Person`       |
| `user_group.js`   | `app.model.UserGroup`    |
| `user/profile.js` | `app.model.User.Profile` |

对数据库表的定义，如下建议：

- 表名统一用tbl开头,例如：tbl_user 用户表 tbl_account_info 账号信息表
- 每张表都需要有唯一主键，方便索引；
- 表中存在创建时间（create_time）、更新时间（update_time）、删除时间（delete_time）三个字段，方便记录操作时间、软删除等
- 表字段建议使用下划线小写连接，例如：user_name 、user_id、login_count
- 关于时间，建议使用13或者10时间戳，方便进行时间范围检索，类型建议使用BIGINT

### 标准模型定义

特别提醒，当egg-sequelize插件初始化完成后，app.model 和 ctx.model上的对象实际一个[Sequelize对象实例](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)
,

所以可以利用它们使用在Sequelize ORM框架提供的任何实例方法，例如：app.model.sync(模型同步)、 app.model.query(原生SQL查询)... so you can use methods
like: `app.model.sync, app.model.query ...`

#### 定义User模型

在app/model目录下，新建user.js文件

```js

// app/model/user.js 
module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;
    const User = app.model.define('user', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });

    User.findByLogin = async function (login) {
        return await this.findOne({
            where: {
                login: login
            }
        });
    }
    // 建议不要使用箭头函数
    User.prototype.logSignin = async function () {
        return await this.update({
            last_sign_in_at: new Date()
        });
    }
    return User;
}; 
```

对于上面的定义，可以将model文件的职责进行单一化处理，就是只做两件事：

- 表结构定义
- 表示关联关系定义

对于在User对象中绑定方法，可以放在service层来写，更好的使用MVC规范。推荐model文件定义可以参考：

```js
'use strict';
/**
 *  用户反馈表单数据
 */
const {STRING, BIGINT, INTEGER} = require('sequelize');
module.exports = app => {
    return app.model.define('feedback', {
        id: {
            filed: 'id',
            type: BIGINT(10),
            primaryKey: true,
            autoIncrement: true,
            comment: '反馈信息主键',
        },
        userid: {
            filed: 'user_id',
            type: STRING(60),
            allowNull: true,
            comment: '用户id',
        },
        type: {
            filed: 'type',
            type: INTEGER(2),
            defaultValue: 0,
            comment: '反馈信息的类型 后续拓展1/2/3..',
        },
        message: {
            filed: 'message',
            type: STRING(600),
            allowNull: false,
            comment: '反馈的信息',
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
```

在模型定义完成后，model即被挂载到app和ctx对象中，可以很方便的在controller和service文件中进行调用，例如

```js
// app/controller/user.js
'use strict';
const {Controller} = require('egg')

class UserController extends Controller {
    async index() {
        // app.model.xxx 和 ctx.model.xxx 效果相同
        const users = await this.ctx.model.User.findAll();
        this.ctx.body = users;
    }

    async show() {
        const user = await this.ctx.model.User.findByLogin(this.ctx.params.login);
        await user.logSignin();
        this.ctx.body = user;
    }
}
```

```js
// app/service/user.js
'use strict';
const {Service} = require('egg')

class UserService extends Service {
    async index() {
        const {ctx, app} = this;
        // 根据主键查找
        return await app.model.User.findByPk({id})
    }

    async showOne(id) {
        const {ctx, app} = this;
        // ctx.model.User 或者 app.model.User
        return await ctx.model.User.findOne({
            id
        });
    }
}

```



### 表关联关系

使用sequelize支持的数据表关联操作，需要在`Model.associate()`中定义。egg-sequelize在所有的模型加载完成后执行。例如：

### 支持多个数据库连接

egg-sequelize插件支持独立加载多个数据库连接配置；可以使用`config.sequelize.datasources`字段来进行配置，加载多个数据库连接

```js
// config/config.default.js
exports.sequelize = {
      clients: {
        younger_sister: {
          username: 'root',
          password: '123456',
          database: '142vip_db_test',
          delegate: 'young_model',
          baseDir: 'young_model', // 数据库模型存放的目录
          exclude: '', // 支持数组或者字符串
          Sequelize: require('sequelize'), // 指定Sequelize模块版本
          // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
        },
        fairy_sister: {
          username: 'root',
          password: '123456',
          database: '142vip_db_test',
          delegate: 'fairy_model',
          baseDir: 'fairy_model', // 数据库模型存放的目录
          exclude: '', // 支持数组或者字符串
          Sequelize: require('sequelize'), // 指定Sequelize模块版本
          // 其他配置，参考：https://github.com/sequelize/sequelize/blob/main/src/sequelize.js
        },
      }, 
      app: true,
      agent: false,
};
```

当然，为了便于区分，可以在model模型文件目录中，按照数据库对模型进行区分，例如：

```js
// app/young_model/user.js
'use strict';
const {STRING, INTEGER, DATE} = require('sequelize');
module.exports = app => {
    return app.model.define('user', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });
};


// app/fairy_model/user.js
'use strict';
const {STRING, INTEGER, DATE} = require('sequelize');
module.exports = app => {
    return app.adminModel.define('user', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });
};
```
调用两个不同的实例，可以通过：

 - ctx.fairy_model.User 或者 app.young_model.User
 - ctx.young_model.User 或者 app.young_model.User

实现了在context和application对象上进行挂载模型


**注意：由于二级目录不一样，虽然上述两个.js中都是定义User,但实际调用还是存在区别;app.model.xxx.User..**

**如果你在不同的数据库连接配置中定义相同的model数据库模型，相同的模型.js文件将会在不同的数据库被执行两次**， 因此需要使用第二个参数来获取sequelize对象实例，例如：

```js
// app/model/user.js
'user strict';
const {STRING, INTEGER, DATE} = require('sequelize');

// 注意此时，.js模型文件定义多一个model参数，直接指定
module.exports = (app, model) => {
    // model为传入，不是app.model
    return model.define('user', {
        login: STRING,
        name: STRING(30),
        password: STRING(32),
        age: INTEGER,
        last_sign_in_at: DATE,
        created_at: DATE,
        updated_at: DATE,
    });
};
```

### 自定义Sequelize模块

在默认情况下，egg-sequelize插件将会使用最新较为稳定的sequelize@6 ，支持自定sequelize的版本。即：配置`config.sequelize.Sequelize`字段

```js
// config/config.default.js
'use strict';
exports.sequelize = {
    // 此时引入的版本，可以在package.json中指定并下载
    Sequelize: require('sequelize')
};
```

### 完整示例

```js
// app/model/post.js
'use strict';
const {STRING, INTEGER, DATE} = require('sequelize');
module.exports = app => {
    const Post = app.model.define('Post', {
        name: STRING(30),
        user_id: INTEGER,
        created_at: DATE,
        updated_at: DATE,
    });
    // 表关联关系
    Post.associate = function () {
        app.model.Post.belongsTo(app.model.User, {
            as: 'user'
        });
    }
    return Post;
};

// app/controller/post.js
class PostController extends Controller {
    async index() {
        const posts = await this.ctx.model.Post.findAll({
            attributes: ['id', 'user_id'],
            include: {model: this.ctx.model.User, as: 'user'},
            where: {status: 'publish'},
            order: 'id desc',
        });
        this.ctx.body = posts;
    }

    async show() {
        const post = await this.ctx.model.Post.findByPk(this.params.id);
        const user = await post.getUser();
        post.setDataValue('user', user);
        this.ctx.body = post;
    }

    async destroy() {
        const post = await this.ctx.model.Post.findByPk(this.params.id);
        await post.destroy();
        this.ctx.body = {
            success: true
        };
    }
}
```

### 同步模型到数据库

**强烈建议使用Sequelize提供的Migrations迁移方案，进行数据库的字段迁移更新，因为它记录了日志，可以回滚！！！！！**

当然，在日常开发中，你也可以很方便在开发环境中进行如下配置，快速迁移、修改数据库表结构。重要的事说三遍

- 以下配置，只建议在开发环境中配置使用，会直接更新表结构，覆盖数据；生产环境极其容易导致数据丢失！！
- 以下配置，只建议在开发环境中配置使用，会直接更新表结构，覆盖数据；生产环境极其容易导致数据丢失！！
- 以下配置，只建议在开发环境中配置使用，会直接更新表结构，覆盖数据；生产环境极其容易导致数据丢失！！

```js
// {app_root}/app.js
'use strict';
module.exports = app => {
    // 注意前置条件判断
    if (app.config.env === 'local' || app.config.env === 'unittest') {
        app.beforeStart(async () => {
            await app.model.sync({
                alter: false, // 数据库表按照模型调整；
                force: false, // 数据库表不强制删除后重建
            });
        });
    }
};
```

### 可能遇到的问题

##### 1.如何开启模型同步

```js
// 在项目app.js中，调用sync()函数，启动项目时候即可同步model
'use strict';
class AppBootHook {
    constructor(app) {
        this.app = app;
    }
    async willReady() {
        try {
            await this.app.model.sync({
                alter: true, // 数据库表按照模型调整；
                force: false, // 数据库表不强制删除后重建
            });
        } catch (e) {
        }
    }
}
```

更多问题欢迎 [issues](https://github.com/142vip/egg-sequelize/issues) 交流.

### 开发者

- 个人：[Rong姐姐好可爱 ](https://github.com/mmdapl)
- 开源组织：[142vip](https://github.com/142vip)

### 友情链接

- [egg-sequelize官方插件](https://github.com/eggjs/egg-sequelize)
- [Sequelize中文文档](https://www.sequelize.com.cn/)

### 证书

[MIT](LICENSE)

```text
MIT License

Copyright (c) 2022 142vip FairySister Rong姐姐好可爱

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

