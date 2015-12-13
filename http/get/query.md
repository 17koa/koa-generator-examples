# 如何获取query参数

routes/index.js

```javascript
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

于是把request和response上的方法也丢给this，这样就相当于this上有了对应request和response里的方法的别名（简写方式）

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
