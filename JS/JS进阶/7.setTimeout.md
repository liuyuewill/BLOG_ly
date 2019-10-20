###　setTimeout( fun, delay)

delay:  实际加入到主线程的**最小**延迟时间

具体能在多少时间之后执行，取决于现有调用栈函数的执行进度，以及消息队列中前面的任务执行进度。

```JS
const s = new Date().getSeconds(); //获取当前的秒数
setTimeout(function() {
  // 输出 "2"，表示回调函数并没有在 500 毫秒之后立即执行
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);


while(true) {//这个循环含义就是，至少要过2s，当前主线程任务才执行完毕
  if(new Date().getSeconds() - s >= 2) { 
    console.log("Good, looped for 2 seconds");
    break;
  }
}

就算是把500改为0，执行结果也是一样
```

