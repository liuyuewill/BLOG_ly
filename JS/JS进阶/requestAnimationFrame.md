### window.requestAnimationFrame(callback(timestamp))
- callback：下一次重绘之前更新动画帧所调用的函数
- callback的第一个参数timestamp，是开始去执行回调函数的时刻，这个是默认的
- 传回值是一个ID，传给 window.cancelAnimationFrame() 可取消回调函数

为什么要用requestAnimationFrame，用定时器setTimeout/setInterval不香吗？
浏览器刷新的频率是1秒60帧，一帧是16.67ms,如果用js写动画，那setInterval的延迟设为16.67不可以吗？NO。  因为，主线程代码如果执行时间超过16.67，就会导致setInterval的执行时刻是准确的16.67ms。这时候就可以用requestAnimationFrame，交由浏览器来处理，在每次重绘之前，执行callback, 开发就不用担心刷新频率的问题了

  ```JS
  function animationWidth() { // 此回调函数就是一帧
    var div = document.getElementById('box');
    div.style.width = parseInt(div.style.width) + 1 + 'px';

    if(parseInt(div.style.width) < 200) {
      requestAnimationFrame(animationWidth)
    }
  }

  requestAnimationFrame(animationWidth);




为避免一帧多次执行callback（如，在scorll时），第一想法可能是节流，但节流是通过时间来控制的，但浏览器刷新时间不固定，
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