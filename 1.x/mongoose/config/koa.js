'use strict';

const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const router = require('../router');

module.exports = function(app) {
  app.use(logger());
  app.use(bodyparser());
  app.use(router.routes());
};