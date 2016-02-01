## Promise的历史  

如果大家以前使用JavaScript写过异步操作的代码，一定对回调函数记忆深刻。如果你需要嵌套多个异步操作的话，回调函数将会是长长的一串，整个代码将变得非常难于阅读。因此，在ES5的年代，Promise对象营运而生。通过使用Promise对象，对不同异步操作的等待，变成了一个函数调用链表，给代码可读性带来了非常大的提高。不过在ES5年代，你需要使用第三方的库来引入Promise支持，在ES6中，Promise变成了内置的对象，你可以直接使用了。

## Promise对象的基本使用  

创建Promise对象  
--------------------------------------------------------------------------------

在ES6中，你可以通过```new Promise(function(resolve, reject){
})```来创建Promise对象，下面是一个具体的代码。

```javascript
'use strict';
var fs = require("fs");
var promiseObj = new Promise(function(resolve, reject){
    //put some code to call
    fs.readFile("temp.txt", (err, data) => {
        if (err){
            reject(err);
        }else{
            resolved(data);
        }
    });
});
```

