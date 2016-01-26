# 映射  
我们可以把映射看成是对JavaScript Object的一个扩展。在传统的JavaScript Object中，当我们设置key, value对的时候，key只能是字符串。ES6对这个进行了扩展，形成了新的映射类型，映射类型的key, value对可以是任意对象。  

## 映射的初始化  
在ES6中，可以通过如下2种对构造函数的调用来创建并初始化一个映射对象  
* 不传参数给构造函数，这将创建一个空的映射  
```javascript  
var sampleMap = new Map();
console.log(sampleMap.size); //will output 0
```
* 传一个数组给构造函数，这个传入的数组的每个元素包含2个值，第一个将作为key, 另外一个作为value  
```javascript  
var sampleMap = new Map([['key1', 'val1'], ['key2', 'val2']]);
//will output 2, also sampleMap will have key key1 and key2
console.log(sampleMap.size);//will output 2
```

## 对映射对象的操作  
和集合对象类似，你可以对映射对象执行如下的操作  
* 增加成员，通过```set(key, val)```向映射对象增加成员  
* 删除成员，通过```delete(key)```从映射对象删除成员
* 测试是否包含，通过```has(key)```测试是否包含某个key
* 获取成员，通过```get(key)```返回成员
* 清空成员，通过```clear()```操作清空整个映射对象  

另外，映射对象和集合对象一样，当你使用object作为key的时候，是根据key是否指向同样的内存对象来判断是否new一个key的。如果2个key的对象指向的是同一个内存对象，那么后面一个set将覆盖前面一个set的内容。  

## 对映射对象的遍历  
对映射对象，你可以使用下面的任意一种方法进行合适的遍历。  
* ```keys()```调用，```keys()```调用将返回映射对象key的集合，接着你就可以使用```for...of```循环遍历了。  
```javascript   
'use strict';
var sampleMap = new Map();
sampleMap.set('key1', 'val1');
sampleMap.set('key2', 'val2');
for (let key of sampleMap.keys()){
  console.log(key + '---' + sampleMap.get(key));
}
``` 

* ```values()```调用，```values()```调用返回映射对象value的集合，接着你就可以使用```for...of```循环遍历了。  
```javascript   
'use strict';
var sampleMap = new Map();
sampleMap.set('key1', 'val1');
sampleMap.set('key2', 'val2');
for (let val of sampleMap.values()){
  console.log(val);
}
``` 

* ```entries()```调用，```entries()```调用返回映射对象key和value的集合，接着你就可以使用```for...of```循环遍历了。  
```javascript   
'use strict';
var sampleMap = new Map();
sampleMap.set('key1', 'val1');
sampleMap.set('key2', 'val2');
for (let item of sampleMap.entries()){
  console.log(item[0] + '---' + item[1]);
}
``` 

*```forEach()```调用  
```javascript  
'use strict';
var sampleMap = new Map();
sampleMap.set('key1', 'val1');
sampleMap.set('key2', 'val2');
sampleMap.forEach(function(value, key, map){
  console.log(key + '---' + value);
});
```

# 弱映射  
和弱集合一样，弱映射的key不被垃圾回收所检查，当key对应的对象被回收的时候，也自动从弱映射中被删除。由于这个原因，弱映射和弱集合一样无法进行遍历，这能修改。
