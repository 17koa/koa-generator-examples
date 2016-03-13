'use strict'

const user = require('./controller/user')
const sign = require('./controller/sign')
const auth = require('./middleware/authenticator')
const router = require('koa-router')()

// sign
router.get('/login', sign.showLogin)
router.post('/login', auth.loginRequired, sign.login)
router.post('/logout', auth.userRequired, sign.logout)

// user
router.get('/users/profile', auth.userRequired, user.showProfile)
// admin
// '/user' 使用 admin 中间件
router.use('/admin', auth.userRequired, auth.adminRequired)
router.get('/admin/users', user.listAll)
router.post('/admin/users', user.create)
router.put('/admin/users/:id', user.update)
router.delete('/admin/users/:id', user.remove)

module.exports = router
