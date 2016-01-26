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
console.log(sampleSet);
```
# 弱集合  
# 映射  
# 弱映射  