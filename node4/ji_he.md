# 集合  
集合对象类似于以前JavaScript中的数组，只是集合对象中不能存在相同的对象。  
## 集合的初始化  
集合对象是通过构造函数进行初始化的，调用格式有2种  
* 不传参数给构造函数，这将创建一个空的集合对象  
```javascript 
var sampleSet = new Set();
console.log(sampleSet.size); //will output 0
```
* 传递一个数组对象给构造函数，将创建一个包含这个数组中不重复内容的集合  
```javascript 
var sampleSet = new Set([1,2,3,4,5,5,6]);
console.log(sampleSet.size);//will output 6
console.log(sampleSet);//will ouput Set {1,2,3,4,5,6}
```

## 向集合添加内容  
可以通过使用集合对象的add方法向已经创建的集合添加新的内容  
```javascript
var sampleSet = new Set();
sampleSet.add(2);
sampleSet.add('2');
console.log(sampleSet.size); //will output 2
console.log(sampleSet); //will output Set { 2, '2' }

//例子2
var sampleSet = new Set();
sampleSet.add(NaN);
sampleSet.add(NaN);
console.log(sampleSet); //will output Set { NaN }
```  
从上面程序的输出，可以看出  
* 集合可以保存不同类型的数据
* 在向集合添加数据的时候，JavaScript并不进行数据转化。因此2和'2'是不一样的  
* 对集合对象来说，所有的NaN都是一样的

## 向集合添加对象  
我们之所以将向集合添加对象单独出来解释，是因为对对象是否相同的判断和普通对象不一样。下面是几个例子。  
```javascript  
//例子1
var sampleSet = new Set();
var a = {};
var a1 = a;
//因为a和a1在底层指向的是同一个内存对象，所以a === a1
sampleSet.add(a);
sampleSet.add(a1);
console.log(sampleSet); //will output Set { {} }

//例子2
var sampleSet = new Set();
var a = {};
var a1 = {};
//因为a和a1在底层指向的是不同的内存对象，所以a != a1
sampleSet.add(a);
sampleSet.add(a1);
console.log(sampleSet); //will output Set Set { {}, {} }
```

## 集合的其他操作  
除了向已经存在的集合添加内容，你还可以通过集合的成员函数实施下面的操作  
* 删除内容，通过```delete(value)```来删除集合中的某个内容  
* 判断集合是否包含内容，通过```has(value)```来判断集合中是否包含参数所指定的内容  
* 清除所有内容，通过```clear()```你可以删除一个集合中的所有内容  

## 集合对象的遍历  
遍历集合对象最简单的方法就是遍历```values()```方法的返回值，下面是一个具体的例子  
```javascript  
'use strict';
var sampleSet = new Set([1,2,3,4,5]);
//output is
//1
//2
//3
//4
//5
for (let val of sampleSet.values()){
  console.log(val);
}
```
遍历集合的第二个方法是条用```forEach```函数完成，下面是具体的例子。对于这个例子，大家一定很奇怪，为什么forEach接受的函数的参数是2个。对于这点我一开始也觉得很奇怪，在看了相关的文档才明白，实际上对于集合中的每个元素，都有2个属性与之绑定（Key和value)，只不过他们完全相同而已，我个人估计是为了和映射对象保持类似的结构，从而简化Javascript引擎而这么做的。  
```javascript
var sampleSet = new Set([1,2,3,4,5]);
//output is
//1
//2
//3
//4
//5
//实际上你用console.log(key)也会得到完全一样的结果
sampleSet.forEach((value, key) => {console.log(value);});
```
# 弱集合  
弱集合对象和普通的集合对象有着下面这些不同点:  
* 弱集合对象只能保存对象，不能保存普通数据  
* 弱集合对象对另外一个对象的引用，并不影响垃圾回收器的工作。换句话说，如果一个弱集合```set```包含一个对象```a```的引用，如果在运行过程中，除了这个应用，没有任何其他地方应用```a```这个对象了，那么垃圾回收器将回收```a```。
* 弱集合对象没有```size```属性，也不能进行遍历。不能进行遍历的原因就是因为第二点。因为在遍历的过程中，集合中的对象随时可能被垃圾回收器给回收。  

## 可以执行的操作  
根据上面的描述，对弱集合对象可以进行的操作仅限于。  
* 增加成员，使用```add()```方法增加成员  
* 删除成员, 使用```delete()```方法删除成员  
* 判断成员是否在集合，使用```has()```方法判断一个成员是否存在

## 弱集合的使用  
弱集合的一个使用场合是你需要操作DOM的一个集合，但是你不想因为集合拥有对DOM对象的引用而阻止对DOM对象的自动销毁。  