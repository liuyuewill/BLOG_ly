### js 

- JS引入方式：https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html
  - js 动态插入 script 
  - defer：异步加载，元素解析完成后执行
  - async：异步加载，与元素渲染并行执行
- AST：https://mp.weixin.qq.com/s/0-k1xZr8-nPCakN-jnfRnQ
- ES6 / ES7
- 浅拷贝：内层引用类型时，仍指向同一个地址
  - Object.assign / 展开运算符(...)
- 深拷贝
  - JOSN.parse(JSON.stringify(obj))： 性能最快
    - 循环引用的对象时，报错
    - 当值为函数或 undefined时，无法拷贝  
  - 递归

<img width="600" src="2.png">

- 原型链：是由原型对象组成，每个对象都有 __proto__ 属性，指向了创建该对象的构造函数的原型，__proto__ 将对象连接起来组成了原型链。是一个用来实现继承和共享属性的有限的对象链。

  - 属性查找机制：当查找对象的属性时，如果实例对象自身不存在该属性，则沿着原型链往上一级查找，找到时则输出，不存在时，则继续沿着原型链往上一级查找，直至最顶级的原型对象Object.prototype，如还是没找到，则输出undefined；
  - 属性修改机制：只会修改实例对象本身的属性，如果不存在，则进行添加该属性，如果需要修改原型的属性时，则可以用：b.prototype.x = 2；但是这样会造成所有继承于该对象的实例的属性发生改变。

- 数组(array)

  - flat: [1,[2,3]] --> [1, 2, 3]

  ```js
  arr.prototype.flat = function() {
      this.toString().split(',').map(item=> +item )
  }
  ```

  - map
  - forEach: 无法break， 可以用try/catch中throw new Error来停止
  - filter: 过滤,[1,2,3,4,5]然后filter之后为[1,3,5]
  - some: 有一项返回true，则整体为 true
  - every: 有一项返回false，则整体为 false
  - join
  - push / pop: 末尾推入和弹出，改变原数组， 返回推入/弹出项
  - unshift / shift: 头部推入和弹出，改变原数组，返回操作项
  - sort(fn) / reverse: 改变原数组
  - concat: 不影响原数组， 浅拷贝
  - slice(start, end): 返回新数组，不改变原数组
  - splice(start, number, value...): 返回删除元素组成的数组，value为插入项，改变原数组
  - indexOf / lastIndexOf(value, fromIndex)
  - reduce / reduceRight(fn(prev, cur)， defaultPrev): 两两执行，prev为上次化简函数的return值，cur为当前值(从第二项开始) 
  - 数组乱序： 

  ```js
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  arr.sort(function () {
      return Math.random() - 0.5;
  });
  ```

- new过程

  - 新生成一个对象
  - 链接到原型:  obj.__protp__ = Con.prototype
  - 绑定this : apply
  - 返回新对象

- instanceof

- 能在实例的原型对象链中找到该构造函数的prototype属性所指向的原型对象，就返回true

- 复用

  - 继承 
  - 复制 extend
  - 混入 mixin
  - 借用, apply/call

- 继承

  - 最优化： 圣杯模式

  ```js
  var inherit = (function(c,p){
  	var F = function(){};
  	return function(c,p){
  		F.prototype = p.prototype;
  		c.prototype = new F();
  		c.uber = p.prototype;
  		c.prototype.constructor = c;
  	}
  })();
  ```

  - ES6 class / extends

- 类型转换

  - -、*、/、% ：一律转换成数值后计算
  - +： 
    - 数字 + 字符串 = 字符串， 运算顺序是从左到右
    - 数字 + 对象， 优先调用对象的 valueOf -> toString
    - 数字 + boolean/null = 数字
    - 数字 + undefined == NaN
  - [1].toString == '1'; {}.toString == '[object object]'
  - NaN !== NaN 、+undefined == NaN

- 类型判断

  - 基本类型 + function ：null / string / number / boolean / undefined : 直接使用 typeof
  - 其余引用类型：调用 toString 后用 '[object XXX]' 进行判断

```js
let class2type = {}
'Array Date RegExp Object Error'.split(' ').forEach(e => class2type[ '[object ' + e + ']' ] = e.toLowerCase()) 

function type(obj) {
    if (obj == null) {
        return String(obj)
    }
    return typeof obj === 'object' ? class2type[ Object.prototype.toString.call(obj) ] || 'object' : typeof obj
}
```

- 执行上下文

  - 抽象理解为对象
    - 变量对象(VO)
    - 作用域链(词法作用域)
    - this指向
  - 分为：
    - 全局执行上下文
    - 函数执行上下文  	  
    - eval执行上下文
  - 执行：
    - 创建全局上下文(global EC)
    - 全局执行上下文(caller) --> 函数执行上下文(callee)， callee 被 push 到栈顶层，成为 active EC, caller挂起
    - 函数执行完后，callee 被 pop 移除，控制权交还全局上下文(caller)，继续执行

- 变量对象 : 数据作用域，存储着变量和函数声明(不包含函数表达式)

  - 活动对象：当变量对象所处的上下文为 active EC时

- 作用域：变量的作用范围

  - 块级作用域
  - 函数作用域
  - 声明提前： 一个声明在函数体内都是可见的, 函数优先于变量
  - 非匿名自执行函数，函数变量只为可读，无法修改:

  ```js
  var foo = 1
  (function foo() {
      foo = 10  // 由于foo在函数中只为可读，因此赋值无效
      console.log(foo)
  }()) // -> ƒ foo() { foo = 10 ; console.log(foo) }
  ```

- 作用域链：对象列表，包含父级和自身的变量对象

  - [[scope]]: 包含父级变量对象和作用域链
  - AO: 自身活动对象

- 闭包(静态作用域)：在父函数被销毁的情况下，子函数的[[scope]]中仍然保留着父级的单变量对象和作用域链，可以访问到父级的变量对象

  - 闭包问题： 多个子函数的[[scope]]都是同一份，是共享的，因此父级的变量对象被修改时，所有子函数都受到影响
  - 解决： 
    - 可以通过参数的形式传入，避免使用[[scope]]查找 
    - setTimeout 第三个参数传入
    - 使用 let

- 模块化

  - ES6： import / exports
  - commonjs: require / module.exports / exports
  - AMD: require / defined 

  > require 支持动态导入， import 不支持，正在提案

  > require 是同步导入，import属于异步导入

  > require 是值拷贝，导出值变化不会影响导入值；import指向内存地址，导入值会随导出值而变化

- 防抖(debounce)： 多次操作变为最后一次执行

```js
function debounce(fn, wait, immediate) {
    let timer = null

    return function() {
        let args = arguments
        let context = this

        if (immediate && !timer) {
            fn.apply(context, args)
        }

        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, wait)
    }
}
```

- 节流(throttle)： 每隔一段时间后执行一次

```js
function throttle(fn, wait, immediate) {
    let timer = null
    let callNow = true
    
    return function() {
        let context = this,
            args = arguments

        if (callNow) {
            fn.apply(context, args)
            callNow = false
        }

        if (!timer) {
            timer = setTimeout(() => {
                fn.apply(context, args)
                timer = null
            }, wait)
        }
    }
}
```

- 函数执行改变this
  - call: fn.call(this, 1, 2)
  - apply: fn.apply(this, [1, 2])
  - bind: fn.bind(this)(1,2)	 
- promise
- generator: yield: 暂停代码 / next(): 继续执行代码
- async / await ： 是 generator 的语法糖， babel中是基于 promise 实现

```js
async function getUserByAsync(){
   let user = await fetchUser();
   return user;
}
getUserByAsync().then(v => console.log(v));
```

- babel原理
  - babylon解析代码成 AST
  - babel-traverse 对 AST 进行遍历转译，得到新的 AST
  - 新AST通过babel-generator转换成ES5

#### 字符串(string)

#### 函数柯里化

在一个函数中，首先填充几个参数，然后再返回一个新的函数的技术，称为柯里化

```js
let add = function add(x) {
	return function (y) {
		return x + y
	}
}

add(1)(2)  // 3
```

### 正则表达式 

## 性能优化

## Websocket

- Websocket是一个持久化的协议， 基于 http ， 服务端可以主动 push
  - 兼容：
    - FLASH Socket
    - 长轮询： 定时发送 ajax
    - long poll： 发送 --> 有消息时再 response
  - new WebSocket(url)
  - ws.onerror = fn
  - ws.onclose = fn
  - ws.onopen = fn
  - ws.onmessage = fn
  - ws.send()

## Browser

- 跨标签页通讯

  - localStorage 与 监听 storage
  - cookie 与 setInterval 

- 浏览器结构

  - 用户界面
  - 主进程 
  - 内核
    - 渲染引擎
    - JS引擎
      - 执行栈 
    - 事件触发线程
      - 消息队列
        - 微任务
        - 宏任务  
    - 网络异步线程
    - 定时器线程

- Event Loop
  一次事件循环是执行一个宏任务，然后清空微任务列表，循环再执行宏任务，再清微任务列表 

  - microtask(jobs): promise / ajax / Object.observe
  - macrotask(task): setTimout / script / IO / UI Rendering

- Node 的 Event Loop: 6个阶段

  - timer: setTimeout / setInterval

  - I/O: 执行上轮循环残流的 callback

  - idle, prepare

  - poll：等待回调

    - 1. 执行回调

    - 2. 执行定时器

      - 如有 setTimeout / setInterval， 则返回timer
      - 如有 setImmediate， 则前往 check 阶段

  - check

    - 执行 setImmediate

  - close callbacks

- 从输入url 到展示的过程

  - DNS解析
  - TCP三次握手
    - 客户端发送 syn(同步序列编号) 请求，进入 syn_send 状态，等待确认
    - 服务端接收并确认 syn包后发送 syn+ack 包，进入 syn_recv状态
    - 客户端接收syn+ack包后，发送ack包，双方进入established状态
  - 发送请求，分析URL，设置请求报文(头，主体)
  - 服务器返回请求的文件(html)
  - 浏览器渲染
    - HTML parser --> DOM Tree
      - 标记化算法， < > 进行状态的标记
      - 树构建 
    - CSS parser --> Style Tree
    - attachment --> Render Tree
    - layout
    - GPU painting

- TCP四次挥手

  - 客户端 -- FIN --> 服务端， FIN—WAIT
  - 服务端 -- ACK --> 客户端， CLOSE-WAIT
  - 服务端 -- ACK,FIN --> 客户端， LAST-ACK
  - 客户端 -- ACK --> 服务端，CLOSED 

- 重绘(repaint)： 不改变布局 

- 回流(reflow): 影响布局，必定导致重绘

- 跨域

  - JSONP
  - CORS： Access-Control-Allow-Origin：*
  - postMessage
  - document.domain

- 存储

  - cookie： 用户身份 / http中自动携带， 4K， 自行设置过期时间
  - localStorage / sessionStorage：长久储存/窗口关闭删除， 4-5M
  - indexDB:浏览器本地的数据库，可以被网页脚本创建和操作，能储存大量数据，可以提供接口，还能建立索引。http://www.ruanyifeng.com/blog/2018/07/indexeddb.html，，，https://www.zhangxinxu.com/wordpress/2017/07/html5-indexeddb-js-example/

- Web Worker  

- V8垃圾回收机制

  - 新生代算法: 用于存活较短的对象
    - Scavenge GC : from space -> to space 
  - 老生代算法: 用于存活时间较长的对象
    - 从新生代转移到老生代 
      - 经历过 Scavenge GC
      - to space 超过25%
    - 标记清除算法： 
      - 增量标记：小模块标记，在代码执行间隙执行
      - 并发标记(2018)：不阻塞js执行
    - 压缩算法： 清除后导致的内存碎片化

- 内存泄露

  - 全局变量
  - 定时器
  - 事件监听(低版本浏览器可能出现)
  - JS中的DOM引用
  - 闭包