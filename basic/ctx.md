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

- this是上下文(注释1*)
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

注释1： 此处的this 并不同于通常状态下的this 指向（即调用者）。在koa中 this 指向每一次的请求，在请求接受后初始化，在一次请求结束后被释放。
