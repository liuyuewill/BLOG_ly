### requestAnimationFrame

window.requestAnimationFrame(callback(timestamp))

- 会在每一帧确定执行，属于高优先级任务

- callback：下一次【布局、重绘】之前更新动画帧所调用的函数
- callback的第一个参数默认是 timestamp，是开始去执行回调函数的时刻
- 传回值是一个ID，传给 window.cancelAnimationFrame() 可取消回调函数

为什么要用 requestAnimationFrame，用定时器 setTimeout/setInterval 不香吗？
浏览器刷新的频率是1秒60帧，一帧是16.67ms, 如果用js写动画，那setInterval的延迟设为16.67不可以吗？NO。  因为，主线程代码如果执行时间超过16.67，就会导致 setInterval 的执行时刻是不是准确的16.67ms。这时用requestAnimationFrame，交由浏览器来处理，在每次【布局、重绘】之前，执行callback, 开发就不用担心刷新频率的问题了

  ```JS
  function animationWidth() { // 此回调函数就是一帧
    var div = document.getElementById('box');
    div.style.width = parseInt(div.style.width) + 1 + 'px';

    if(parseInt(div.style.width) < 200) {
      requestAnimationFrame(animationWidth)
    }
  }

  requestAnimationFrame(animationWidth);




为避免一帧多次执行 callback（如，在scorll时），第一想法可能是节流，但节流是通过时间来控制的，但浏览器刷新时间不固定，
所以，只要保证 requestAnimationFrame 的队列里，同样的回调函数只有一个就可以了：

const onScroll = e => {
    if (scheduledAnimationFrame) { return }

    scheduledAnimationFrame = true
    window.requestAnimationFrame(timestamp => {
        scheduledAnimationFrame = false
        animation(timestamp)
    })
}
window.addEventListener('scroll', onScroll)
  ```



### reqeuestIdleCallback

执行的前提条件：当前浏览器处于空闲状态。即：假如某一帧里执行的任务不多，不到16ms就完成了所有任务，那么还会有空闲时间，就会来执行 reqeuestIdleCallback 的回调。

那如果浏览器一直忙，没有空闲时间了，怎么办？就得传入第二个入参，requestIdleCallback(myNonEssentialWork, { timeout: 2000 }), 会强制浏览器在当前帧执行完后执行

用法：

```JS
requestIdleCallback(myNonEssentialWork, { timeout: 2000 });
    
function myNonEssentialWork (deadline) {
  // deadline有两个参数
  // deadline.timeRemaining()：获取到当前帧剩余时间
  // deadline.didTimeout: 为true时回调函数是由于超时才得以执行的话


  while (（deadline.timeRemaining() > 0 || deadline.didTimeout）&& tasks.length > 0) {
    doWorkIfNeeded();
  }
  if (tasks.length > 0){
    requestIdleCallback(myNonEssentialWork);
  }
}

// 如果是因为timeout回调才得以执行的话，其实用户就有可能会感觉到卡顿了，因为一帧的执行时间必然已经超过16ms了
```

- 强烈不建议在requestIdleCallback里执行DOM修改操作

  因为requestIdleCallback回调能执行说明前面的工作已经完成，再做DOM修改，会重新进行布局重绘，会拉长当前帧的耗时。推荐在requestAnimationFrame做DOM操作。

