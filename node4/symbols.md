## 概述  
在ES5中，所有的属性名使用的都是标准的字符串，如果你想修改一个别人提供的对象，并且为这个对象增加一个方法的时候，你就要非常小心了，因为你可能选择了一个已经存在的方法的名字。因此在ES6中引入了Symbol这个类型，当你使用Symbol类型来定义类的属性或者方法名的时候，ES6将保证这个属性和方法名称是全局唯一的。
### 创建Symbol实例  
```javascript  
# 第一种方法直接使用Symbol构造函数
var s1 = Symbol();
# 为创建的Symbol对象指定一个名称
var s2 = Symbol("test");
# 使用这种方法，每次创建出来的Symbol对象都是不一样的
var s3 = Symbol("test");
# console.log(s2 == s3)将返回false

# 第二种方法，使用Symbol.for方法来创建Symbol实例
# 使用Symbol.for方法来创建一个Symbol实例的时候，
# 系统首先会在一个全局的注册表中查找是否有相同Key名称的Symbol被创建了，如果找到，就返回已经存在的对象
# 否则，将创建一个全新的对象
s1 = Symbol.for("test")
s2 = Symbol.for("test")
console.log(s1 == s2) //will return true
console.log(s1 == s3) // will return false，因为s3是通过Symbol调用产生的
```
在我们了解了ES6为什么需要引入Symbol对象之后，让我们来看一些具体的例子来增加一些对Symbol对象的感性的认识。
## 引用实例1 --- 对象的属性  
### 使用Symbol来定义类的属性  
```javascript  
var a = {};
var s1 = Symbol("test");
a[s1] = "hello world!";
console.log(a[s1]); //this will print "Hello World!"
```
**需要注意的是，当使用Symbol作为属性名的时候，一定要用[]来进行引用，如果你用.（点号）进行引用，那么产生的属性名实际是一个字符串，和Symbol对象本身没一点关系**
### 遍历使用Symbol来定义的属性  
因为Symbol对象不是一个字符串，所以原先的**Object.getOwnPropertyNames()**方法并不会返回它们，你需要使用专门的**Object.getOwnPropertySymbols()**方法来访问它们。  
```javascript  
var a = {};
var s1 = Symbol("test");
var s2 = Symbol("testfunc");
a[s1] = "hello world!";
a[s2] = function(){
    console.log("Test function");
};
//below code will return []
console.log(Object.getOwnPropertyNames(a));
//below code will return [Symbol(test), Symbol(testfunc)]
console.log(Object.getOwnPropertySymbols(a));
```
## 引用实例2 --- 消除魔术字符串  
魔术字符串指的是在代码中反复出现的相同的字符串，对一个结构良好的代码来说，应该尽量消除魔术字符串的存在，而使用常量作为替代。下面就让我们来看一个具体的例子来了解如何使用Symbol来消除代码中的魔术字符串。 在代码中我们尝试根据输入信息的不同返回不同的Hello
```javascript  
# 引入Symbol前的代码
# 在这个代码中es, ch就是魔术字符串
# 当你在调用这个函数的时候，必须确保输入的参数是一个有效的魔术值
function getHello(country){
    switch(country){
        case "es":
            return "Holla";
        case "ch":
            return "你好";
        default:
            return "Hello";
    }
}
console.log(getHello("es"));
console.log(getHello("ch"));
```  
```javascript  
# 引入Symbol之后的代码
# 在这个代码中es, ch不再是一个具体的字符串
# 因此不管在COUNTRY_CODE中如何修改es, ch的定义，调用方的代码都不需要修改
const COUNTRY_CODE= {
    es: Symbol(),
    ch: Symbol()
}
function getHello(country){
    switch(country){
        case COUNTRY_CODE.es:
            return "Holla";
        case COUNTRY_CODE.ch:
            return "你好"
        default:
            return "Hello"
    }
}
console.log(getHello(COUNTRY_CODE.es));
console.log(getHello(COUNTRY_CODE.ch));
```
## ES6内置的Symbol实例  
### Symbol.hasInstance 
对对象使用instanceof调用的时候，在ES6内部调用的是obj[Symbol.hasInstance]方法  
### Symbol.isConcatSpreadable  
决定调用Array.prototype.contact方法的时候，对象是否可以展开  
```javascript  
var arr1 = [1, 2];
[3, 4].concat(arr1); // return [3, 4, 1, 2]

arr1[Symbol.isConcatSpreadable] = false;
[3, 4].concat(arr1); // return [3, 4, [1, 2]]
```
### 和字符串操作相关的Symbol
* Symbol.replace指向一个方法，将被String.prototype.replace调用
* Symbol.search指向一个方法，将被String.prototype.search调用
* Symbol.split指向一个方法，将被String.prototype.split调用
* Symbol.match指向一个方法，将被str.match(object)调用
* Symbol.toStringTag只想一个方法，将被Object.prototype.toString调用
### Symbol.iterator  
指向对象的默认遍历器
### Symbol.toPrimitive  
指向一个方法，将对象转换成一个primitive类型的值。这个方法将接受一个hint参数，表示要转换成哪种primitive类型，具体的value包括"Number", "String", "Default"
### Symbol.unscopables  
指向一个属性，这个属性返回一个JSON对象，表示该对象的哪些属性将被with环境排除在外，下面是一个具体的例子。  
```javascript  
# when Test has no Symbol.unscopables
class Test{
  saySomething() { return "abc"; }
}
var saySomething = function() { return "123"; }
with(Test.prototype){
  saySomething(); // return "abc"
}
# when Test has Symbole.unscopables
class Test{
  saySomething() { return "abc"; }
  get [Symbol.unscopables] {
      return {saySomething: true};
  }
}
with(Test.prototype){
  saySomething(); // now return "123"
}
```