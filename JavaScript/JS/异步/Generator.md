### Generator 函数

- 返回值：一个遍历器对象，可依次遍历 Generator 函数内部的每一个状态。

- 特征：

  - 1、有个星号 
  - 2、函数体内部使用`yield`表达式，定义不同内部状态

  ```JS
  function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
  }
  
  var hw = helloWorldGenerator();
  ```

- 调用该函数后：

  1、【该函数并不执行】，返回的结果也不是 return 的结果，而是一个指向内部状态的指针对象，也就是遍历器对象（里面有个next方法的那个对象）

  2、下一步，必须调用遍历器对象的`next`方法，使得指针移向下一个状态

  3、每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句）为止

  小结：`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行

  ```JS
  hw.next()
  // { value: 'hello', done: false }
  // 第一次调用generator函数，返回遍历器对象，手动调用对象的next方法，返回一个对象，value是yield表达式的值，done表示当前遍历尚未结束
  
  hw.next()
  // { value: 'world', done: false }
  
  hw.next()
  // { value: 'ending', done: true }
  
  hw.next()
  // { value: undefined, done: true }
  ```

  

### yield 表达式

- 是暂停标志。遇到 yield 就会暂停执行，并且会将 yield 后表达式的值作为 返回对象的value的值

  yield后面的表达式，只有调用next，让指针指向该语句，该语句才会执行

```JS
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) { // for of就是执行遍历器对象的next方法
  console.log(f);
}
// 1, 2, 3, 4, 5, 6

```

- `yield`表达式如果用在另一个表达式之中，必须放在圆括号里面

### 与 Iterator接口的关系

- 上面说了 generator函数执行时，其实不是内部代码执行，而是返回一个遍历器对象。所以可以说，Generator 函数就是遍历器生成函数。对象没有 Symbol.iterator 属性，所以没有部署Iterator接口，所以：

```JS
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...myIterable] // [1, 2, 3]

```

- Generator 函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身。

```JS
function* gen(){
  // some code
}
var g = gen();

g[Symbol.iterator]() === g
// true
```



### next 方法的参数

yield 表达式本身没有参数，或者说总是返 undefined

next（param）方法就可带一个参，param会被当作上一个 yield表达式 的返回值

```JS
function* f() {
  for(var i = 0; true; i++) {
    var reset = yield i; // yield i  本身没有返回值，但当next(true)时，yield i 的返回值就会是 true
    if(reset) { i = -1; }
  }
}

var g = f();

g.next() // { value: 0, done: false }
g.next() // { value: 1, done: false }
g.next(true) // { value: 0, done: false }
```

### 总结

Generator 有两个核心特征：基本语法 + 数据交互（可以通过next传参）

### 异步任务封装：小马哥博客 https://segmentfault.com/a/1190000019298832

核心思路：

1. 在异步任务执行时，使用`yield`交出执行权
2. 在异步任务结束后，使用`next`交还执行权

```JS
一个简单的例子：
// 1. 首先写一个异步任务,在一秒后返回特定字符串
function asyncTask(callback){
    setTimeout(()=>{
        callback('Hello Leo')
    }, 1000)
}

// 2. 接下来写出期望执行的顺序
function* runTask() {
    let text = yield asyncTask
    console.log(text) // 我们期望这里正常输出Hello Leo
}
// 3. 按照期望值执行函数
const gen = runTask()// 此时执行权已经交出
gen.next().value(function (text) {// 执行asyncTask并传入callback ，关键点在于在callback里调用next交还执行权
    gen.next(text)
}) 


-------------------------


实现一个自动任务执行器：
function autoExecute(task) {
    const gen = task()
    let result = gen.next()
    while(true){
        if(result.done){
            break // 执行结束
            return 
        }
        console.log(result.value)//为了便于观察 我们加上console.log
        result = gen.next(result.value) // 每次都应该重写result 获取最新结果
    }
}

function* simpleTask(){
    yield 1
    yield 2
    yield 3
    return 
}

autoExecute(simpleTask)// 测试我们写的自动执行器 能够正确输出123
```

