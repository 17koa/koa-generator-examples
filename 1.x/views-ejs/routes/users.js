var router = require('koa-router')();

router.get('/', function *(next) {
  this.body = "This is a user's response!";
});

module.exports = router;
