```js
例子：
var numbers = [65, 44, 12, 4];

function getSum(total, num) {
    return total + num;
}
function myFunction(item) {
    document.getElementById("demo").innerHTML = numbers.reduce(getSum);
}
```


```js
用法：
numbers.reduce(getSum, initValue);  // 如果 initValue 没有传值，就会默认是数组的第一个值
reduce接收一个函数，作为累加器
```

