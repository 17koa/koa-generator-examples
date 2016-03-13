'use strict'

const logger = require('koa-logger')
const session = require('koa-generic-session')
const bodyparser = require('koa-bodyparser')
const router = require('../router')

module.exports = function (app) {
  app.keys = ['key', 'keys']
  app.use(logger())
  app.use(session())
  app.use(bodyparser())
  app.use(router.routes())
}
