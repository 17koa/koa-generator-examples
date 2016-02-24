# 一起学koa

koa是下一代基于nodejs的modern web framework，会用到很多es高级特性，可以说无论从es学习还是web开发都有必要学习。

鉴于目前学习资料不多，故有此书

年前几天比较忙，更新暂缓

## 宗旨

大家一起学习koa

- 暂时不会的可以学会
- 会的可以帮助他人，查缺补漏，提供更多最佳实践

## 参与流程

通过提问、实现，pr的方式

- 提issue
- 根据某个issue，fork并实现
- 提交pr
- 合并pr并提交
- 发布到git pages上

## 版本说明

目前Koa 2.x还没有发布，先以Koa 1.x为主

## koajs 1.x和2.x的区别

1.x和2.x的都是基于ctx（上下文）模型实现的

目前2.x还没没有完全定下来

- nodejs 4.0+支持的es6语法
- async/await支持 (现在须借由 babel)
- generator不能直接使用，必须使用co类的包装后才可以

## 目录

- koa基础
  * 上下文
- koa-generator
  * 安装
  * 创建项目
  * 切换视图模板引擎
  * 路由
- HTTP
  * Get请求
    + 如何获取query参数
    + 如何获取params
  * Post请求
    + 从post获取参数
    + 标准表单(Post with x-www-form-urlencoded)
    + 文件上传(Post with form-data)
    + Post with raw
- 数据库
  * MySQL
  * Mongo
- 流程控制
  * generator/co
    + es6的generator是什么？
    + co = generator + promise
  * async/await
  * promise with bluebird
- 测试
  * Mocha
  * supertest
- 部署
- 最佳实践
- FAQ

## 预览

- [一起学koa之1.x版本预览](http://base-n.github.io/koa-generator-examples/)
- [一起学koa之2.x版本预览](2.x.md)

## 技术顾问

- [@fundon](https://github.com/fundon)
- [@alsotang](https://github.com/alsotang)
- [@老雷](https://github.com/leizongmin)

用明白不一定写明白，但写明白就一定能用明白，大家加油

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request


## Version History

- v0.1.0 初始化版本

## 欢迎fork和反馈

如有建议或意见，请在issue提问或邮件

当然也可以在国内最专业的cnode论坛上回复[《一起学koa》](https://cnodejs.org/topic/5668e0a55af0e6ab3bf1a1d8)

## License

this repo is released under the [MIT
License](http://www.opensource.org/licenses/MIT).
