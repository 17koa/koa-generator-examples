# 如何获取params

express里经典用法

http://expressjs.com/en/4x/api.html#app.param


```javascript
app.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});
```

请求是


访问http://127.0.0.1:3000/users/alfred


那么koa里如何使用呢？

关于路由

- express是自带路由
- koa这货没有，所以，需要另外集成，koa-generator使用的是目前比较流行的koa-router（我喜欢它的是Express-style）

https://github.com/alexmingoia/koa-router

好吧

routes/users.js

```javascript
var router = require('koa-router')();

router.get('/:id', function *(next) {
  console.log(this.params);
  console.log(this.request.params);
  this.body = 'this a users response!';
});

module.exports = router;
```

执行

```shell
npm run 2
```

访问http://127.0.0.1:3000/users/alfred

日志

```
  <-- GET /users/alfred
{ id: 'alfred' }
undefined
GET /users/alfred - 28
```

首先肯定一点，this.params是可以取到params的，这点和express路由用法类似

但是注意的是

```javascript
this.request.params != this.params
```

这说明params不是request上的方法，翻查源码，确实是如此

https://github.com/alexmingoia/koa-router/blob/5.x/lib/router.js#L317