# [koa-generator](github.com/base-n/koa-generator)

这里的generator是生成器的意思，用于生成项目骨架，[express-generator](https://github.com/expressjs/generator)就是一个比较好的例子，虽然比较精简，但结构清晰，足矣满足一般性的开发需求

鉴于很多人非常熟悉expressjs，这里假定大家也熟悉express-generator

express-generator提供的功能

- 生成项目骨架
- 约定目录结构（经典，精简，结构清晰）
- 支持css预处理器

koa-generator提供的功能

- 生成项目骨架
- 约定目录结构（和express-generator的结构一模一样）
- 支持css预处理器（暂未实行）

2个生成器共同的项目骨架结构

- app.js为入口
- bin/www为启动入口
- 支持static server，即public目录
- 支持routes路由目录
- 支持views视图目录
- 默认jade为模板引擎

koa-generator支持koa1.x和2.x，安装后，可以分别使用`koa`和`koa2`分别创建。
