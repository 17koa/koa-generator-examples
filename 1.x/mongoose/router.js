'use strict';

const user = require('./controller/user');

const Router = require('koa-router');
const router = new Router()

// user 模块
router.get('/profile', user.showProfile);

router.get('/user/all', user.showAll);
router.post('/user/create', user.create);
router.post('/user/edit', user.edit);
router.post('/user/remove', user.remove);

module.exports = router;