# koa中的异常处理

比如router中某个yield可能抛错，这种情况下要返回请求是怎么做的呀，都是直接在app on error里面处理吗

在route里

```
co(function* () {
  var result = yield Promise.resolve(true);
  return result;
}).then(function (value) {
  console.log(value);
}, function (err) {
  // 异常处理
  console.error(err.stack);
});
```

