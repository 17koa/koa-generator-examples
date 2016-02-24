## 概述  
Generator是ES6引入的实现异步操作的一种新方法，在Generator出现之前，不管哪种方法，异步操作都是使用回调函数来实现的。只从出现了Generator之后，开发人员可以使用同步调用的逻辑来实现异步操作，只要在需要等待的地方，使用yield语句放弃运行即可。  
### Generator的基本写法  
和学习所有其他语言特性一样，我们使用一个Hello World来作为Generator的入门代码  
```javascript  
function* helloworld(){
    yield "Hello";
    return "World!";
}

func = helloworld();
func.next();//return { value: 'Hello', done: false }
func.next();//return { value: 'World!', done: true }
func.next();//return { value: '', done: true }
```  
从上面的代码的输出可以看出
* Generator函数的定义，是通过**function ***实现的
* 对Generator函数的调用返回的实际是一个遍历器，随后代码通过使用遍历器的next方法来获得函数的输出
* 通过使用**yield**语句来中断Generator函数的运行，并且可以返回一个中间结果
* 每次调用**next**方法，Generator函数将执行到下一个yield语句或者是return语句。下面我们就对上面代码的每次next调用进行一个详细的解释  
  * 第一次调用next方法的时候，函数执行到```yield "Hello"```语句停了下来，并且返回了Hello这个value，随同value返回的done属性表明Generator函数的运行还没有结束  
  * 第二次调用next方法的时候，函数执行到```return "World!"```语句停了下来，并且返回了World!这个value，随同value返回的done属性表明Generator函数的运行已经结束
  * 第三次调用next方法的时候，由于Generator函数执行已经结束了，所以函数调用立即返回，done属性表明Generator函数已经结束运行，value是空的，因为这次调用并没有执行任何语句  

### yield语句  
yield语句在Generator函数的执行过程中扮演了中断/暂停执行函数的功能。每次你调用next()方法的时候，Generator函数都将执行到下一个yield语句或者return语句，当执行到yield语句的时候，如果yield语句跟着一个表达式，那么表达式的值将作为value被返回。  
## next方法参数
由于yield语句只是抛出value, 但是本身并不返回value，如果你要yield语句有返回值，就要在调用next方法的时候，传入一个参数，这个参数就将作为上一个yield语句的返回值，下面是一个例子  
```javascript  
function* f() {
  for(var i=0; true; i++) {
    var reset = yield i;
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```   
## for...of循环  
在上面的所有例子中，如果我们要让Generator函数执行下一步，就必须调用一次next方法，那么有没有什么方法让Generator函数自动执行每一步而不需要代码干预呢?答案是肯定的，我们可以使用for...of循环来实现，下面是一个具体的例子。在下面的例子中，for..of loop将遍历所有的yield语句（**记住只是遍历yield语句，因此return语句的返回值是不会输出的**）
```javascript  
function* loopThroughInt(){
    for (let index = 0; index < 100; index++){
        yield index;
    }
	return 100;
}
for (let v of loopThroughInt()){
    console.log(v); //output 0...99
}
```  
## yield*  
如果在Generator函数内部需要调用另外一个Generator函数，那么对目标函数的调用就需要使用yield*，以下是一个简单的例子  
```javascript  
function* objects(){
    yield "cat";
    yield "dog";
    yield "duck";
}
function* say(){
    yield* objects();
    yield " say hello world!";
}
```  