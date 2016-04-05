# 基于pm2 部署

## What
- pm2 是一款Node.js的管理工具
- 保证Node.js应用永远在线
- 挂了自动重启
- 自动Cluster
- 免中断的Reload程序

## How
### 安装
```
npm i -g pm2
```


### 运行
- 默认单进程运行 `pm2 start app.js`
- N CPU Cluster `pms start app.js -i n`，n=CPU_NUM，n=0代表最大CPU数量
- 监控 `pm2 m`
- 重启全部 `pm2 restart all`
- 重载全部 `pm2 reload all`，与`restart`的区别就是**不中断**

## Why
用pm2启动你的Node.js应用的目的就是保证你的应用不会因为一些未知的错误导致整个应用程序退出。
