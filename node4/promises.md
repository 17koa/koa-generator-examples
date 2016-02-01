## Promise的历史  

如果大家以前使用JavaScript写过异步操作的代码，一定对回调函数记忆深刻。如果你需要嵌套多个异步操作的话，回调函数将会是长长的一串，整个代码将变得非常难于阅读。因此，在ES5的年代，Promise对象营运而生。通过使用Promise对象，对不同异步操作的等待，变成了一个函数调用链表，给代码可读性带来了非常大的提高。不过在ES5年代，你需要使用第三方的库来引入Promise支持，在ES6中，Promise变成了内置的对象，你可以直接使用了。

## Promise对象的特性 

* Promise对象一旦创建，就开始执行了，你没有办法取消Promise对象的执行。
* Promise对象执行的结果只能是2种。如果异步操作执行成功，那么resolve函数将被调用；如果异步操作执行失败，那么reject函数将被调用。
* 因为Promise对象的实现方法，在异步操作过程中出现的异常是不会被抛出的，因此需要在Promise对象内部进行处理。

## Promise对象的使用  

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

关联resolve function和reject function 
--------------------------------------------------------------------------------

在上面的例子中，如果你执行这个代码，你会发现没有任何的效果（没有输出），那是因为你没有给这个创建的Promise对象关联相应的resolve和reject函数。下面是一个进一步的例子，这个例子将给Promise对象绑定resolve和reject函数，你就可以看到效果了。在我的测试环境中，因为我们有名为"temp.txt"的文件存在，所以输出了```file read fail```。

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
promiseObj.then(function(data){
    console.log("file read succ");
}, function(err){
    console.log("file read fail");
})
```

在通常情况下，reject状态的函数我们一般不在then中设置，而是在catch中设置，这样代码看起来更像是传统意义上的同步代码(和try...catch比较）。因此上面的例子可以重新写成 

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
promiseObj.then(function(data){
    console.log("file read succ");
}).catch(function(err){
    console.log("file read fail");
});
```

级联多个Promise对象
--------------------------------------------------------------------------------

Promise对象的resolve函数的参数可以是另外一个Promise对象，这样就可以将2个Promise对象级联起来。下面是一个简单的例子

```javascript
'use strict';
var p1 = new Promise(function(resolve, reject){
    setTimeout(() => reject(new Error("something test"), 3000));
});

var p2 = new Promise(function(resolve, reject){
    setTimeout(() => resolve(p1), 1000);
});

p2.then(function(data){
   console.log("p2 succ");
}).catch(function(err){
   console.log("p2 fail");
});
```

## Promise的特殊函数  

Promise.all()
--------------------------------------------------------------------------------

将多个Promise包装成一个全新的Promise Object，如果所有的Promise被Resolved，那么新的Promise将被Resolve；否则新的Promise将被Reject。

Promise.race()
--------------------------------------------------------------------------------

和.all一样，.race将把多个Promise包装成一个新的Promise Object，不同的地方是。这些Promise之中任何一个Resolve或者Reject了，新的Promise就被Resolve或者Reject了。

Promise.resolve()
--------------------------------------------------------------------------------

将传入的对象封装成一个Promise对象返回。