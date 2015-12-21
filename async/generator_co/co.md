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

```onFulfilled();```
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
```

```gen.next(res)```第一步后的{value:''done:''}保存到ret

```gen.throw(err)```抛出错误

```next(ret)```进入next()

```js
function next(ret) {
  if (ret.done) return resolve(ret.value);
  var value = toPromise.call(ctx, ret.value);
  if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
  return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
    + 'but the following object was passed: "' + String(ret.value) + '"'));
}
```

next()中通过判断ret.done是否为true来确定是否需要再执行下去,不为true时,将yield后的ret.value转化为promise.

通过```value.then(onFulfilled, onRejected)```执行onFulfilled或onRejected,实现循环调用,直到抛出错误或者,ret.done为true为止.

ret.done为true,则```resolve(ret.value)```

看完这些代码基本能理解koa的流程了:

- 运行到每一个yield,将yield右边转化为promise.
- 带着onFulfilled的res继续执行到下一个yield 或者直接通过onRejected的err抛出错误.
- 通过next()与onFulfille()d和onRejected()的循环调用实现generator的自动执行.

最后补充下toPromise支持转化thunks,array,objects,generators,generator functions.
     
所以可以被yield的是以下6种:

- promises
- thunks (functions)
- array (parallel execution)
- objects (parallel execution)
- generators (delegation)
- generator functions (delegation)