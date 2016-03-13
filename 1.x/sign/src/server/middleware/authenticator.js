'use strict'

/**
 * 用户鉴权
 */
exports.userRequired = function * (next) {
  let user = this.session.user
  if (!user) {
    this.throw(401, 'user invail!')
  }
  yield next
}

/**
 * 管理员鉴权
 */
exports.adminRequired = function * (next) {
  let user = this.session.user
  if (user.role < 50) {
    this.throw(401, 'not admin!!!')
  }
  yield next
}

/**
 *  避免重复登陆
 */
exports.loginRequired = function * (next) {
  if (this.session.user) {
    this.throw(400, 'user has logined!!')
  }
  yield next
}
