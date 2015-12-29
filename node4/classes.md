# classes 

各种 ‘类’，再也无需用 CoffeeScript 的语法糖写类了

## 在ES6中声明一个class  
在ES6中，你可以使用如下的方式进行Class声明。**在使用的过程中，有一点需要特别注意，一定要先使用下面的任何一种方式声明的class，才能引用class定义。**这个和原先的JavaScript prototype方式声明有很大的区别，在原先的方式中，因为class是通过function来声明的，而在javascript中，function将自动变成全局可见，所以class的定义可以出现在引用之后。
* 使用class关键字  
```javascript  
class Polygon{
    constructor(height, width){
      this.height = height;
      this.width = width;
    }
}
```
*使用class表达式进行声明  
```javascript  
var Polygon = class {
  constructor(height, width){
    this.height = height;
    this.width = width;
  }
}
```  
