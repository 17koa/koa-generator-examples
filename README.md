# koa-generator-examples


## 上下文

koa的中间件

```
app.use(function *(next){
  this; // is the Context
  this.request; // is a koa Request
  this.response; // is a koa Response
});
```

说明：this是上下文

http模型里的请求和响应

- this.request
- this.response


对比express的中间价

```
app.use(function (req, res, next) {
  return next();
});
```

express里的req和res是显示声明，看起来更清晰一些

next处理是一样的，二者无差异

## Get

```
npm run 1
```


### 如何获取query参数

routes/index.js

```
var router = require('koa-router')();

router.get('/', function *(next) {
  console.log(this.request.query)
  console.log(this.query)
  
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

module.exports = router;
```

访问http://127.0.0.1:3000/?a=1

日志

```
  <-- GET /?a=1
{ a: '1' }
{ a: '1' }
```

和express里获取query的方法是一样的，req.query

koa里是

- this.request.query
- this.query

这里需要说明以下this上下文上有request和response2个对象，每次写起来又比较麻烦

于是把request和response上的方法也丢给this，这样就想到于this上有了对应request和response里的方法的别名（简写方式）

- 别名列表

Request aliases

以下访问器和别名与 Request 等价：

- ctx.header
- ctx.method
- ctx.method=
- ctx.url
- ctx.url=
- ctx.originalUrl
- ctx.path
- ctx.path=
- ctx.query
- ctx.query=
- ctx.querystring
- ctx.querystring=
- ctx.host
- ctx.hostname
- ctx.fresh
- ctx.stale
- ctx.socket
- ctx.protocol
- ctx.secure
- ctx.ip
- ctx.ips
- ctx.subdomains
- ctx.is()
- ctx.accepts()
- ctx.acceptsEncodings()
- ctx.acceptsCharsets()
- ctx.acceptsLanguages()
- ctx.get()

Response aliases

以下访问器和别名与 Response 等价：

- ctx.body
- ctx.body=
- ctx.status
- ctx.status=
- ctx.length=
- ctx.length
- ctx.type=
- ctx.type
- ctx.headerSent
- ctx.redirect()
- ctx.attachment()
- ctx.set()
- ctx.remove()
- ctx.lastModified=
- ctx.etag=

### 如何获取params

express里经典用法

http://expressjs.com/en/4x/api.html#app.param


```
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

```
var router = require('koa-router')();

router.get('/:id', function *(next) {
  console.log(this.params);
  console.log(this.request.params);
  this.body = 'this a users response!';
});

module.exports = router;
```

执行

```
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

```
this.request.params != this.params
```

这说明params不是request上的方法，翻查源码，确实是如此

https://github.com/alexmingoia/koa-router/blob/5.x/lib/router.js#L317

