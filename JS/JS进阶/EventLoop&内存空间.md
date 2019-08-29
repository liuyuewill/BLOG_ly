### 事件循环
- 浏览器是多进程的
- JS是单线程的，此单线程中拥有唯一的事件循环，事件循环中的队列可以有多个
- JavaScript代码的执行过程中，除了依靠`函数调用栈`来搞定函数的执行顺序外，还依靠`任务队列`(task queue)来搞定另外一些代码的执行
- 队列：先进先出
  - macro-task宏任务：script(整体代码), setTimeout队列, setInterval队列, setImmediate, I/O, UI rendering。
  - micro-task微任务：process.nextTick, Promise队列, Object.observe(已废弃), MutationObserver(html5新特性)
- 浏览器循环机制：
  - 从macro-task开始，找到其中`一个任务队列`执行完毕，然后再执行`所有的micro-task`，这样一直循环下去(一对多)
  - 当我们在执行setTimeout任务中遇到setTimeout时，它仍然会将对应的任务分发到setTimeout队列中去，但是该任务就得等到下一轮事件循环执行了

---
### 内存空间
- 栈空间存储原理：先进后出
- 堆：存储的key-value是可以无序的
- 队列：先进先出
- 变量对象与基础数据类型
  - JavaScript的执行上下文生成之后，会创建一个`变量对象`
  - JavaScript的`基础数据类型`都会保存在变量对象中
  - 基础数据类型都是按值访问
  - 引用类型的值都是按引用访问的
    - `引用数据类型`的值是保存在`堆内存`中的对象。JavaScript不允许直接访问堆内存中的位置，因此我们不能直接操作对象的堆内存空间,在操作对象时，实际上是在操作对象的引用而不是实际的对象
- 内存空间管理
  - 自动垃圾收集机制: 标记清除的算法