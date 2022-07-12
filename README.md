# egg-sequelize-plus

<p align="center">
<a href="https://space.bilibili.com/350937042" target="_blank"><img src="https://img.shields.io/badge/Bilibili-哔哩哔哩-green.svg"></a> 
<a href="https://142vip.cn" target="_blank"><img src="https://img.shields.io/badge/142vip-个人网站-orange.svg"></a>
<a href="http://yapi.142vip.cn" target="_blank"><img src="https://img.shields.io/badge/yapi-接口系统-8fe.svg"></a>
<a href="https://blog.142vip.cn" target="_blank"><img src="https://img.shields.io/badge/blog-我的博客-blue.svg"></a>
<a href="https://github.com/mmdapl" target="_blank"><img src="https://img.shields.io/badge/github-Github-9ac.svg"></a>
<a href="https://gitee.com/mmdapl" target="_blank"><img src="https://img.shields.io/badge/gitee-码云-4ed.svg"></a>
<a href="https://blog.csdn.net/Mmdapl" target="_blank"><img src="https://img.shields.io/badge/csdn-CSDN-8ea.svg"></a>


</p>

<div style="text-align:center">

[![NPM version][npm-image]][npm-url][![Known Vulnerabilities][snyk-image]][snyk-url][![npm download][download-image]][download-url]

</div>


[npm-image]: https://img.shields.io/npm/v/egg-sequelize-plus.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-sequelize-plus
[travis-image]: https://img.shields.io/travis/eggjs/egg-sequelize-plus.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-sequelize-plus
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-sequelize-plus.svg?style=flat-square
[codecov-url]: https://github.com/mmdapl/egg-sequelize-plus
[david-image]: https://img.shields.io/david/eggjs/egg-sequelize-plus.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-sequelize-plus
[snyk-image]: https://snyk.io/test/npm/egg-sequelize-plus/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-sequelize-plus
[download-image]: https://img.shields.io/npm/dm/egg-sequelize-plus.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-sequelize-plus


Sequelize plugin for Egg.js,Based on egg-sequelize at present

NOTE: This plug-in integrates sequelize to egg.js on the basis of egg sequelize, provides dynamic database creation, realizes data dynamic deployment, and is perfectly compatible with all functions of the current egg sequelize plug-in
more documentation please visit [sequelize](http://sequelizejs.com) and [egg-sequelize](https://github.com/eggjs/egg-sequelize) 

| egg-sequelize-plus| egg 1.x |
--- | ---
1.x | 😁
0.x | ❌

## Install

```bash
$ npm i egg-sequelize-plus --save
```
If the egg project fails to start and reminds mysql2 or sequelize module that it cannot be found , just like this
```
could not find module 'mysql2' 
// or 
could not find module 'sequelize'
```
you can try the following command
```bash
$ npm install mysql2 --save
// or 
$ npm install sequelize --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.sequelizePlus = {
  enable: true,
  package: 'egg-sequelize-plus',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.sequelizePlus = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql 
  database: 'test',
  host: 'localhost', //default
  port: 3306,
  username: 'root', // default
  password: 'root', // default
  // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
  // more sequelize options
  logging: false,
  options: {
    timezone: 'Asia/Shanghai',
    pool: {
      maxConnections: 5,
    },
  },
};
```
You can also use the connection uri to configure the connection:
```js
exports.sequelize = {
  dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
  connectionUri: 'mysql://root:@127.0.0.1:3306/test',
  // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
  // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
  // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
  // more sequelize options
};
```
egg-sequelize has a default sequelize options below
```js
{
    delegate: 'model',
    baseDir: 'model',
    logging(...args) {
      // if benchmark enabled, log used
      const used = typeof args[1] === 'number' ? `[${args[1]}ms]` : '';
      app.logger.info('[egg-sequelize]%s %s', used, args[0]);
    },
    host: 'localhost',
    port: 3306,
    username: 'root',
    benchmark: true,
    define: {
      freezeTableName: false,
      underscored: true,
    },
  }
```
see [config/config.default.js](config/config.default.js) for more  detail and default config
## Model files

Please put models under `app/model` dir by default.

## Conventions

| model file        | class name               |
| :---------------- | :----------------------- |
| `user.js`         | `app.model.User`         |
| `person.js`       | `app.model.Person`       |
| `user_group.js`   | `app.model.UserGroup`    |
| `user/profile.js` | `app.model.User.Profile` |

- Tables always has timestamp fields: `created_at datetime`, `updated_at datetime`.
- Use underscore style column name, for example: `user_id`, `comments_count`.

### Standard

Define a model first.

> NOTE: `options.delegate` default to `model`, so `app.model` is an [Instance of Sequelize](http://docs.sequelizejs.com/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor), so you can use methods like: `app.model.sync, app.model.query ...`

```js
// app/model/user.js 
module.exports = app => {  
  const { STRING, INTEGER, DATE } = app.Sequelize; 
    const User = app.model.define('user', {    
    login: STRING,    
    name: STRING(30),    
    password: STRING(32),    
    age: INTEGER,    
    last_sign_in_at: DATE,    
    created_at: DATE,    
    updated_at: DATE,  
  });   
  User.findByLogin = async function(login) {        
    return await this.findOne({      
      where: {        
        login: login      
        }    
      });
    }   
// don't use arraw function  
User.prototype.logSignin = async function() {    
  return await this.update({ 
    last_sign_in_at: new Date() 
    }); 
  } 
  return User;
}; 
```

Now you can use it in your controller:

```js
// app/controller/user.js
class UserController extends Controller {  
  async index() {    
  const users = await this.ctx.model.User.findAll();
  this.ctx.body = users;
  }
  async show() {
  const user = await this.ctx.model.User.findByLogin(this.ctx.params.login);    
  await user.logSignin();
  this.ctx.body = user;
}
```

### Associate

Define all your associations in `Model.associate()` and egg-sequelize will execute it after all models loaded. See example below.

### Multiple Datasources

egg-sequelize support load multiple datasources independently. You can use `config.sequelize.datasources` to configure and load multiple datasources.

```js
// config/config.default.js
exports.sequelize = {  
  datasources: [{     
     delegate: 'model', // load all models to app.model and ctx.model 
     baseDir: 'model', // load models from `app/model/*.js`
     database: 'biz',      // other sequelize configurations
  },    
  {      
    delegate: 'admninModel', // load all models to app.adminModel and ctx.adminModel 
    baseDir: 'admin_model', // load models from `app/admin_model/*.js` 
    database: 'admin',      // other sequelize configurations
   }]
};
```

Then we can define model like this:

```js
// app/model/user.js
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = app.model.define('user', {
      login: STRING,
      name: STRING(30),
      password: STRING(32),
      age: INTEGER,
      last_sign_in_at: DATE,
      created_at: DATE,        
      updated_at: DATE,
    });  
    return User;
}; 
// app/admin_model/user.js
module.exports = app => { 
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = app.adminModel.define('user', { 
    login: STRING, 
    name: STRING(30), 
    password: STRING(32),
    age: INTEGER, 
    last_sign_in_at: DATE,
    created_at: DATE, 
    updated_at: DATE, 
  });
  return User;
};
```

If you define the same model for different datasource, the same model file will be excute twice for different database, so we can use the secound argument to get the sequelize instance:

```js
// app/model/user.js
// if this file will load multiple times for different datasource
// we can use the secound argument to get the sequelize instance
module.exports = (app, model) => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const User = model.define('user', {
    login: STRING,
    name: STRING(30),
    password: STRING(32),
    age: INTEGER,    
    last_sign_in_at: DATE,    
    created_at: DATE,    
    updated_at: DATE, 
    });   
    return User;
};
```

### Customize Sequelize

By default, egg-sequelize will use sequelize@5, you can cusomize sequelize version by pass sequelize instance with `config.sequelize.Sequelize` like this:

```js
// config/config.default.js
exports.sequelize = { 
   Sequelize: require('sequelize');
};
```

### Full example

```js
// app/model/post.js
 module.exports = app => {  
   const { STRING, INTEGER, DATE } = app.Sequelize;   
   const Post = app.model.define('Post', {    
     name: STRING(30),    
     user_id: INTEGER,    
     created_at: DATE,    
     updated_at: DATE,  });   
     Post.associate = function() {    
       app.model.Post.belongsTo(app.model.User, { 
         as: 'user' 
       }); 
      }   
    return Post;
     };
// app/controller/post.js
class PostController extends Controller {  a
  async index() {    
    const posts = await this.ctx.model.Post.findAll({      
      attributes: [ 'id', 'user_id' ],      
      include: { model: this.ctx.model.User, as: 'user' },      
      where: { status: 'publish' },      
      order: 'id desc',    });     
      this.ctx.body = posts;  
  }   
  async show() {    
    const post = await this.ctx.model.Post.findByPk(this.params.id);    const user = await post.getUser();    
    post.setDataValue('user', user);    
    this.ctx.body = post;  
  }   
  async destroy() {    
    const post = await this.ctx.model.Post.findByPk(this.params.id);    await post.destroy();    
    this.ctx.body = { 
      success: true 
    };  
  }
}
```

## Sync model to db

**We strongly recommend you to use Sequelize - Migrations to create or migrate database.**

**This code should only be used in development.**

```
// {app_root}/app.js
module.exports = app => {  
  if (app.config.env === 'local' || app.config.env === 'unittest') {    
    app.beforeStart(async () => {      
    await app.model.sync({force: true});    
    });  
}};
```

## Questions & Suggestions

Please open an issue [here](https://github.com/mmdapl/egg-sequelize-plus/issues).
## Author 

[Taylor ](https://github.com/mmdapl)

## License

[MIT](LICENSE)
