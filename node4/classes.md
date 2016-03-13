# classes 
## 在ES6中声明一个class  
在ES6中，你可以使用如下的方式进行Class声明。**在使用的过程中，有一点需要特别注意，一定要先使用下面的任何一种方式声明的class，才能引用class定义。**这个和原先的JavaScript prototype方式声明有很大的区别，在原先的方式中，因为class是通过function来声明的，而在javascript中，function将自动变成全局可见，所以class的定义可以出现在引用之后。  
在后面的文章中，为了保持代码的一致性和文章的清晰，我们将只适用第一种方式进行class定义
* 使用class关键字  
```javascript  
class Polygon{
}
```
*使用class表达式进行声明  
```javascript  
var Polygon = class {
}
```  
## 定义class的构造函数  
通过使用constructor关键字，你可以给class定义一个构造函数。不过在整个class的定义中，只能有一个构造函数存在.下面是一个具体的例子  
```javascript  
class Polygon{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
}
```  
## 给class增加成员属性  
在ES6中， 你可以通过getter和setter方法，给类增加属性。如果属性只有getter方法，那么它就是一个只读属性；如果属性同时又setter和getter方法，那么它就是一个可读写属性。请看下面的例子  
**注意属性`name`和`_name`**  
因为我们定义了 name 的读写器，而没有定义 _name 的读写器，所以访问这两个属性的结果是不同的。  
```javascript  
class Person{
    constructor(name){
        this._name = name;
    }
    get name(){
        return this._name.toUpperCase();
    }
    /**
     * 注意一点，不要这样写:
     * set name(somename) {
     *  this.name = somename;
     * }
     * 因为给 this.name 赋值的时候会调用 set name ，这样会导致无限递归直到栈溢出。
     *
     */
    set name(somename){
        this._name = somename;
    }
}
```  

## 给class增加成员函数 
这点没什么可说的，就是在类定义中增加函数定义即可，请看下面的例    
```javascript  
class Polygon{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
    get name(){
        return this._name;
    }
    set name(somename){
        this._name = somename;
    }
    
    //readonly property
    get area(){
        return calcArea();
    }
    
    calcArea(){
        return this.height * this.width;
    }
}
```
## 实现class的继承  
在ES6中，通过使用extends关键字，你可以使用类的继承  
```javascript  
class Animal{
    constructor(name){
        this.name = name;
    }
    
    say(){
        console.log(this.name + " try to say something...");
    }
}
class Dog extends Animal{
    say(){
        //可以通过super关键字来调用父类的方法
        super.say();
        console.log(this.name + " barking...");
    }
}
```
## 静态成员函数  
在ES6中，你可以使用static关键字来定义静态成员函数。静态成员函数的功能主要是对外提供一些辅助方法。在下面的例子中，Point类就向外提供了一个辅助方法来计算2点间的距离
```javascript  
class Point(){
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    static distance(a, b){
        constant dx = a.x - b.x;
        constant dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
```