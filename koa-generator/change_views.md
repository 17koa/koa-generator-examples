# 切换视图模板引擎

视图默认使用的是 `jade` 。如果想使用其他的视图

```shell
$ koa 1.x/views-ejs -e
```

说明

- `-e, --ejs           add ejs engine support (defaults to jade)`

koa-generator使用的是[koa-views](https://github.com/queckezz/koa-views)，支持[所有consolidate.js支持模板引擎](https://github.com/tj/consolidate.js#supported-template-engines)