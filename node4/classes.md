# classes 

## 0、序
从 ECMAScript 6 开始，JavaScript 中有了类（class）这个概念。但需要注意的是，这并不是说：JavaScript 从此变得像其它基于类的面向对象语言一样，有了一种全新的继承模型。JavaScript 中的类只是 JavaScript 现有的、基于原型的继承模型的一种语法包装（语法糖），让我们用更简洁明了的语法实现继承。

## 1、定义一个类

在函数中，类的主要有两个功能`类声明`和`类表达式`

### 1.1、类声明


和其他的oo语言相似，定义一个类的声明可以试用关键字`class`加`类名`的方式进行定义（注意类名第一个字母大写）

下面讲一个经常用到的例子，定义类：

```
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

#### 变量提升

关于类和函数的区别主要是：**函数声明存在变量提升，而类的声明则没有**，也就是说，你需要先声明类，然后才能使用，否则代码会抛出ReferenceError异常，错误如下：
```

var xiaoming = new Student(); //ReferenceError
class Student(){ //你的类声明 }

```

**如果你不知道什么是变量提升，这里可以给你一个简单的说明**

在JavaScript中，一个函数的所有变量会自动提到函数的作用域最上方执行，也就是存在先调用再声明的情况：

```
hoisted(); //"foo"

function hoisted() {
  console.log("foo");
}
```

### 1.2、类表达式

类表达式是定义类的另外一种方式，就像函数表达式一样，在类表达式中，类名是可有可无的。如果定义了类名，则该类名只有在类体内部才能访问到。

```
// 匿名类表达式
var Polygon = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

// 命名类表达式
var Polygon = class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
```

## 2、声明成员和定义方法
`类的成员`需要定义在一对花括号 {} 里，花括号里的代码和花括号本身组成了`类体`。类成员包括`类构造器`和`类方法`（包括静态方法和实例方法）

### 2.1、严格模式
类体中的代码都强制在`严格模式`中执行，即便你没有写`"use strict"`

### 2.2、构造器

`constructor`方法是一个特殊的类方法，**它既不是静态方法也不是实例方法**，它仅在实例化一个类的时候被调用。一个类只能拥有一个名为`constructor`的方法，否则会抛出`SyntaxError`异常。

在子类的构造器中可以使用`super`关键字调用父类的构造器。

### 2.3、原型方法
```
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  
  get area() {
    return this.calcArea()
  }

  calcArea() {
    return this.height * this.width;
  }
}
```

### 2.4、静态方法
使用`static`关键字来定义的静态方法。静态方法是指那些不需要对类进行实例化，使用类名就可以直接访问的方法。静态方法经常用来作为工具函数。

```
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```


## 3、继承

在声明类的时候，使用`extends`可以创建一个继承了父类的类（子类）

```
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}
```

## 4、调用父类方法

`super`关键字可以用来调用其父类的构造器或者类方法

```
class Cat { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + ' roars.');
  }
}
```


## 5、Circle的例子
通过例子说明class的相关知识，这里我们用到Circle来对比，来做以下四件事：

* 在纸上画圆
* 跟踪画了多少个的数量
* 半径作为常量
* 计算圆的面积

```
function Circle(radius) {
    this.radius = radius;
    Circle.circlesMade++;
}

Circle.draw = function draw(circle, canvas) {
	console.log("draw a"+circle+" on "+canvas)
}

Object.defineProperty(Circle, "circlesMade", {
    get: function() {
        return !this._count ? 0 : this._count;
    },

    set: function(val) {
        this._count = val;
    }
});

Circle.prototype = {
    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    },

    getradius() {
        return this._radius;
    },
    setradius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("Circle radius must be an integer.");
        this._radius = radius;
    }
};

//用Class来搞
class Circle {
    constructor(radius) {
        this.radius = radius;
        Circle.circlesMade++;
    };

    static draw(circle, canvas) {
        // Canvas drawing code
    };

    static get circlesMade() {
        return !this._count ? 0 : this._count;
    };
    static set circlesMade(val) {
        this._count = val;
    };

    area() {
        return Math.pow(this.radius, 2) * Math.PI;
    };

    getradius() {
        return this._radius;
    };
    setradius(radius) {
        if (!Number.isInteger(radius))
            throw new Error("Circle radius must be an integer.");
        this._radius = radius;
    };
}

```

## 6、参考资料

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions

https://hacks.mozilla.org/2015/07/es6-in-depth-classes/