'use strict'

const path = require('path')
const _ = require('lodash')

const baseConfig = {
  app: {
    name: 'Koa examples #mongoose',
    root: path.normalize(path.join(__dirname, '/../..')),
    env: process.env.NODE_ENV,
    secret: process.env.SECRET || 'my&&&&&&secret!'
  }
}

const platformConfig = {
  development: {
    app: {
      port: 9000,
      cacheTime: 24 * 60 * 60 * 1000
    },
    mongo: {
      url: 'mongodb://localhost:27017/koa-example-dev'
    }
  },
  test: {
    app: {
      port: 9002
    },
    mongo: {
      url: 'mongodb://localhost:27017/koa-example-test'
    }
  },
  production: {
    app: {
      port: process.env.PORT || 9000,
      cacheTime: 7 * 24 * 60 * 60 * 1000
    },
    mongo: {
      url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI
    }
  }
}
const base = baseConfig.app

module.exports = _.merge(baseConfig, platformConfig[base.env ? base.env : base.env = 'development'])
