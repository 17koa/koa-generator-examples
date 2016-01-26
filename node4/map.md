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


# 弱映射  

