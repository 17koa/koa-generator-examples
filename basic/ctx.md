# 上下文

koa的中间件

```javascript
app.use(function *(next){
  this; // is the Context
  this.request; // is a koa Request
  this.response; // is a koa Response
});
```

说明：

- this是上下文
- *代表es6里的generator

http模型里的请求和响应

- this.request
- this.response


对比express的中间件

```javascript
app.use(function (req, res, next) {
  return next();
});
```

express里的req和res是显式声明，看起来更清晰一些

next处理是一样的，二者无差异
