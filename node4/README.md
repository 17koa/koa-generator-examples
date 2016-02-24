# Nodejs 4.x


## 关于node各版本解释

最近node官网发布了更新日志
Node v5.1.1 (Stable), v4.2.3 “Argon” (LTS), v0.12.9 (LTS) and v0.10.41 (Maintenance) are released
请问这些版本有什么区别，适用于什么场景，我发现node官方提供下载的是 4.2.3和5.1.1，但yum 安装的是 0.10.41
网上搜了下没找到答案，只能靠cnode社区啦~多谢！


- Stable是当前稳定版本
- LTS是长期支持版本
- Maintenance是维护，不再增加任何feature，仅做重大bug修复

## Why use 4.x?

目前4.2.*是LTS（长期支持版本），支持非常多的es6特性，这些都是koa的基石，可以让大家更好的利用es6开发modern web app。

## 新特性

Node.js 4.0.0 可以让您享受最尖端的技术，保持项目的先进性。其中对 v8 的升级几乎做到了与 Chromium / Google Chrome 同步，达到了 4.5.x，它提供了很多新的语言功能。ECMA-262 是 JavaScript 语言规范的最新版本，而且好多新特性数都是开箱即用的。这些新特性包括：

- classes - 各种 ‘类’，再也无需用 CoffeeScript 的语法糖写类了
- typed arrays － 类型数组
- generators - 未来的.js 代码中将有无数生成器，不学一点就看不懂 JS 代码了哦
- collections － 集合、映射、弱集合、弱映射
- arrow functions － 箭向函数
- block scoping － 使用 let 、const 作用域，块辖域
- template strings － 模板字串
- promises － 用标准化了的方法进行延迟和异步计算
- symbols － 唯一的、不可修改的数据

下面会逐一讲解