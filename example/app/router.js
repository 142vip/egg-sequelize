'use strict';

/**
 * 定义接口路由
 * @param app
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/user/getOne', controller.user.findOne);
  router.get('/user/getList', controller.user.findList);
  router.put('/user/update', controller.user.update);
  router.post('/user/create', controller.user.create);
  router.delete('/user/destroy', controller.user.destroy);
};
