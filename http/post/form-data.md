# Post with form-data

主要目的是为了上传

```shell
$ npm install --save koa-multer
```

Usage

```javascript
var express = require('express')
var multer  = require('multer')

var app = express()
app.use(multer({ dest: './uploads/'}))
```

You can access the fields and files in the request object:

```javascript
console.log(req.body)
console.log(req.files)
```

重要提示： Multer will not process any form which is not multipart/form-data

[see more](https://github.com/koa-modules/multer)


测试

```shell
$ npm test
```

使用Postman测试

![](img/post-formdata.png)
