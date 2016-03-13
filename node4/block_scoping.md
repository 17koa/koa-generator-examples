# Let命令  
## 定义Let变量  
在ES6中引入了let命令，通过let命令定义的变量只能在let命令所在的代码块内部被引用。  
```javascript
"use strict"
{
    let hello = "Hello World!"
}
console.log(hello) //会报错，因为没有全局的hello变量被定义
```  
从上面的例子可以看出，使用Let命令定义的变量不会自动被提升为全局变量。相反的情况，如果在上面的例子中，你使用var来定义hello这个变量，那么hello这个变量将自动被提升为全局变量，就可以被后面的console.log访问了。    
## 变量死区  
ES6中规定，如果你在一个代码区块中使用了let命令来定义变量，那么在变量被定义之前，不允许对这个变量的访问存在。因此在let命令之前的所有代码被称为变量死区。如果在变量死区发生了对变量的引用，那么JavaScript引擎将报错。  
```javascript
"use strict"
{
    console.log(hello); //将报错，因为变量声明在之后
    let hello = "Hello World!";
}

#正确代码
{
   let hello = "Hello World!";
   console.log(hello);
}
```  
## 不能重复声明变量  
在同一个代码区块中，你不能使用let/var命令重复定义一个已经已经存在的变量。因此下面的代码将报错。 
```javascript
"use strict"
{
   let hello = "Hello World!";
   let hello = "Hello Not World!";//报错
   console.log(hello);
}
{
   let hello = "Hello World!";
   var hello = "Hello Not World!";//报错
   console.log(hello);
}
```
## 块级作用域  
ES6引入let命令的一个副作用就是引入了块级作用域。让我们来看一个具体的例子来详细分析块级作用域。  
```javascript
function f() { console.log('I am outside!'); }
(function () {
  if(false) {
    // 重复声明一次函数f
    function f() { console.log('I am inside!'); }
  }

  f();
}());
```  
在ES5环境中，这段代码将输出"I am inside!"，这个是因为在ES5中，不管代码块是否被运行，函数定义都将自动被提升到外部（全局空间）。但是如果在ES6中运行，你将看到输出"I am outside!"，这个是因为重复的function定义是在另外一个不被执行的代码块中。实际上在ES6中，上面的代码被翻译成了下面的ES5代码。  
```javascript 
"use strict";

function sayHello() {
  console.log("say hello from global");
}

(function () {
  if (false) {
    var _sayHello = function _sayHello() {
      console.log("say hello from inside");
    };
  }

  sayHello();
})();
```  
块级作用域的另外一个影响就是把变量绑定到了当前的作用域  
```javascript
 "use strict";
function hello() {
     let word = "hello world!";
     if (false) {
          let word = "hello world1!";
     }
     console.log(word); 
}

hello();//will see "Hello World!"
```
# const命令  
const命令和let命令唯一的区别在于constant命令定义的是一个常量。因此使用constant命令定义的常量必须在定义的同时被初始化。
# 引入其他js文件中定义的变量/常量  
在ES6中，可以使用import语句来引入其他文件中定义的常量 / 变量。  
```javascript
"use strict"
//定义在constants.js的常量
export const HELLO = "hello"

//在其他js中 
import * as constants from "./constants.js"
console.log(constants.HELLO)

import {HELLO as myHello} from "./constants.js"
console.log(myHello)
```
# 全局变量的属性  
在ES6中，使用var定义的变量将是全局变量的属性（window --- 在browser中 or global--在server段代码中 )，因此可以通过window.<var_name>或者global.<var_name>来访问。但是在顶层代码中使用let / constant定义的变量/常量将不是全局变量的属性。
