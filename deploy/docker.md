# 基于Docker 部署

## What
[Docker](http://www.docker.com/) 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，然后发布到任何流行的 Linux 机器上，也可以实现虚拟化。容器是完全使用沙箱机制，相互之间不会有任何接口（类似 iPhone 的 app）。几乎没有性能开销,可以很容易地在机器和数据中心中运行。最重要的是,他们不依赖于任何语言、框架包括系统。

## How
安装查看[Docker官网](http://www.docker.com/)

### 文件目录
```
app
|-- package.json
|-- app.js
```

### 运行
#### 安装依赖包
`docker run --rm -v "$PWD":/worker -w /worker iron/node:dev npm install`

#### 运行应用
`docker run --rm -e "PORT=3000" -v "$PWD":/worker -w /worker iron/node node app.js`

#### 打包应用
##### 新建Dockerfile
>Dockerfile是Docker的构建描述文件

```
FROM iron/node

WORKDIR /app
ADD . /app

ENTRYPOINT ["node", "app.js"]
```

##### 构建
`docker build -t username/app:0.0.1 .`
> 构建一个app镜像，版本号为0.0.1

##### 运行某一版本
`docker run --rm -e "PORT=3000" username/app:0.0.1`

## Why
- 版本控制
- 快速部署
- 可移植
- 应用隔离，安全
- 有利于架构微服务
