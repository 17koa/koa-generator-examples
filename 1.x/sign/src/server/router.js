'use strict';

const user = require('./controller/user');
const sign = require('./controller/sign');
const auth = require('./middleware/authenticator');
const router = require('koa-router')();

// sign
router.get('/login', sign.showLogin);
router.post('/login', auth.loginRequired, sign.login);
router.post('/logout', auth.userRequired, sign.logout);

// user 
router.get('/profile', auth.userRequired, user.showProfile);
// admin
router.use('/user', auth.userRequired, auth.adminRequired); // '/user' 使用 admin 中间件
router.get('/user/all', user.showAll);
router.post('/user/create', user.create);
router.post('/user/edit', user.edit);
router.post('/user/remove', user.remove);

module.exports = router;