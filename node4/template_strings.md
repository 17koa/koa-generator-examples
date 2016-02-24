# 概述  
在ES6引入模板字符串之前，如果大家需要在代码中创建一个包含变量的字符串，那么代码将非常难读，并且也非常容易出错。下面就是一个简单的例子，在例子中我们将输入的3个参数拼接在一起，然后返回给调用方。   
```javascript
//在模板字符串出现前的写法，写法冗长而且难于理解
function returnSomthing(param1, param2, param3){
    return "something return based on input("
           + "param1:" + param1.toString() + "---"
           + "param2:" + param2.toString() + "---"
           + "param3:" + param3.toString();
}

//使用模板字符串的写法,
function returnSomthingNew(param1, param2, param3){
    return `something return based on input(
              param1:${param1}---param2:${param2}---param3:${param3}`;
}
```  
通过上面的代码，你可以看出在使用模板字符串之后，代码变得非常简洁，而且也容易阅读。下面是在使用模板字符串时候的一些注意点  
* 模板字符串是使用 **`** 引用起来的，如果在最终生成的字符串中包含`字符，那么需要使用\字符进行转义
* 模板字符串中对于变量的引用是通过${}来进行的
* 使用模板字符串的时候，${}中可以放入任意合法的JavaScript表达式。JavaScript对包含在${}中的内容实际上是通过eval表达式来进行的  

# 标签模板  
模板字符串可以跟在一个函数名之后，该函数将被调用来处理跟在后面的模板字符串，这个功能被称为标签模板。被调用的函数将接收到下面的参数列表(literals,...values)。其中literals是一个数组，内容是模板字符串中不需要进行变量替换的部分，而values就是每个替换变量经过eval之后的值，下面是一个具体的例子。  
```javascript
var total = 30;
var msg = transform`The total number is ${total}`;
total = 20;
var msg1 = transform`The total number is ${total}`;
//in our sample
//literals = ["The total number is ", ""]
//values = [30]
function transform(literals,...values){
    var output = "";
    for (var index = 0; index < values.length; index++){
	    if (parseInt(values[index]) >= 30){
			output += literals[index] + "high value";
		}else{
			output += literals[index] + "low value";
		}
    }
    output += literals[index];
    return output;
}
console.log(msg); //output The total number is high value
console.log(msg1);//output The total number is low value
```