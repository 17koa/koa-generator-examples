# 路由

写法说明

## Koa 1.x

只要是koa-router写的路由都可以加载的，加载方式和express里一样

```javascript
var router = require('koa-router')();

router.get('/', function *(next) {
  this.body = 'this /1!';
});


router.get('2', function *(next) {
  this.body = 'this /2!';
});

module.exports = router;
```

一定要区分

```javascript
url = /2
router.get('2', function *(next) {
  this.body = 'this /2!';
});
```

```javascript
url = //2
router.get('/2', function *(next) {
  this.body = 'this /2!';
});
```

这个是koa-router的一个问题，和express里的路由稍有不一样，注意一些即可

## Koa 2.x

由于Koa 2.x支持async，故写法稍有差异

```javascript
var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  await ctx.render('index', {
    title: 'Hello World Koa!'
  });
});
module.exports = router;
```
