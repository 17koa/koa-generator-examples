'use strict'

const app = require('koa')()
const co = require('co')
const config = require('./config')
const dbInit = require('./config/db')
const koaInit = require('./config/koa')

app.init = co.wrap(function * () {
  yield dbInit()
  koaInit(app)
  app.server = app.listen(config.app.port) // 扩展 server 的方法
})

if (!module.parent) {
  app
    .init()
    .then(function () {
      console.log('%s is listening port: %d !!!', config.app.name, config.app.port)
    })
    .catch(function (err) {
      console.error(err)
    })
}

module.exports = app
