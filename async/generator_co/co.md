# co

理解了co的核心代码就理解了koa的流程控制

```js
var ctx = this;
var args = slice.call(arguments, 1);
```
一开始保存上下文,把arguments的length属性去掉,剩余的参数转数组就是gen的参数

再来看return的promise内的代码

```js
if (typeof gen === 'function') gen = gen.apply(ctx, args);
if (!gen || typeof gen.next !== 'function') return resolve(gen);
```
先判断gen是不是generator function,如果是就转为generator,相当于```gen = new gen;```

转为generator之后就可以调用gen.next()了;

```
onFulfilled();
```

这是进入循环调用链的入口

```js
function onFulfilled(res) {
  var ret;
  try {
    ret = gen.next(res);
  } catch (e) {
    return reject(e);
  }
  next(ret);
}
function onRejected(err) {
  var ret;
  try {
    ret = gen.throw(err);
  } catch (e) {
    return reject(e);
  }
  next(ret);
}
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
    + 'but the following object was passed: "' + String(ret.value) + '"'));
}
```

ret是gen.next后的{value:''done:''}对象,value是yield后的表达式,done是执行状态.

判断ret.done是否为true来确定是否需要再执行下去.为true时,说明已经是generator的最后一步,promise转为resolve.不为true时,将yield后的表达式转化为promise.

先判断是否转化为了promise,转化成功,就通过```value.then(onFulfilled, onRejected)```执行onFulfilled或onRejected,再次调用next(),实现循环调用.

当value不能转为promise时,抛出错误,promise转为reject,停止继续运行.

下面写一个例子简单分析一下：

```js
var co = require('co');
var fs = require('fs');
function thunkRead(name) {
  return function (cb) {
    fs.readFile(name, function (err, file) {
      cb(err, file);
    });
  }
}
co(function *() {
  var file = yield thunkRead("package.json");
  console.log(file);
  return file;
}).then(function (file) {
  console.log(file);
});
```
通过上面这段代码来看一下co的整个流程

先模拟一个名为thunkRead的thunk函数，再看co里面的代码，co里面是一个generator function，```gen = gen.apply(ctx, args);``` 通过这一句转化为了generator。

再进入onFulfilled()函数，第一个gen.next()之后ret是 ```{ value: [Function], done: false }``` 将ret传入next()中，done为false，所以toPromise，value是function，所以thunkToPromise.
```js
function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function (resolve, reject) {
    fn.call(ctx, function (err, res) {
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}
```
因为fn是thunk函数，参数只有一个回调函数, ```fn.call(ctx, function (err, res) {});``` 直接调用resolve,在上面的例子中是resolve(file);

然后回到next()中，此时已经是一个promise对象，调用value的then方法，onFulfilled的参数就是file，再运行gen.next(file)，将上一步yield的结果file传入generator，因为在例子中最后return了file, ret是 ```{ value:<Buffer ...>, done: true }``` 最后不返回值的话应该是 ```{ value: undefined, done: true }
``` , 再进入到next()中， 此时done已经为true，说明已经是generator的最后一步，resolve(value);

co中的代码已经执行结束，因为co也是一个promise, 最后resolve(value)，所有可以在then方法中得到这个value.


补充下toPromise支持转化thunks,array,objects,generators,generator functions.
     
所以可以yieldable的是以下6种:

- promises
- thunks (functions)
- array (parallel execution)
- objects (parallel execution)
- generators (delegation)
- generator functions (delegation)