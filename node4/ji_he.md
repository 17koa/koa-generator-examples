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
遍历集合的第二个方法是条用```forEach```函数完成，下面是具体的例子  
```javascript
var sampleSet = new Set([1,2,3,4,5]);
sampleSet.forEach((value, key) => {console.log(value);});
```
# 弱集合  