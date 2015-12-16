'use strict';

const mongoose = require('mongoose');
const config = require('../config');

module.exports = function() {
  return new Promise(function(resolve, reject) {
    mongoose.connect(config.mongo.url, function(err) {
      if (err) {
        return reject(err);
      }
      console.info(`mongodb connected: ${config.mongo.url} !!!`);
      return resolve();
    });
  });
};