## 概述  
在ES5中，所有的属性名使用的都是标准的字符串，如果你想修改一个别人提供的对象，并且为这个对象增加一个方法的时候，你就要非常小心了，因为你可能选择了一个已经存在的方法的名字。因此在ES6中引入了Symbol这个类型，当你使用Symbol类型来定义类的属性或者方法名的时候，ES6将保证这个属性和方法名称是全局唯一的。
### 创建Symbol实例  
```javascript  
# 第一种方法直接使用Symbol构造函数
var s1 = Symbol();
# 为创建的Symbol对象指定一个名称
var s2 = Symbol("test");
# 使用这种方法，每次创建出来的Symbol对象都是不一样的
# console.log(s2, s3)将返回false
var s3 = Symbol("test");

# 第二种方法，使用Symbol.for方法来创建Symbol实例
# 使用Symbol.for方法来创建一个Symbol实例的时候，
# 系统首先会在一个全局的注册表中查找是否有相同Key名称的Symbol被创建了，如果找到，就返回已经存在的对象
# 否则，将创建一个全新的对象
s1 = Symbol.for("test")
s2 = Symbol.for("test")
console.log(s1 == s2) //will return true
console.log(s1 == s3) // will return false，因为s3是通过Symbol调用产生的
```
## 引用实例1 --- 类的属性  

### 使用Symbol来定义类的属性  
### 遍历使用Symbol来定义的属性  
## 引用实例2 --- 消除魔术字符串  
## ES6内置的Symbol实例