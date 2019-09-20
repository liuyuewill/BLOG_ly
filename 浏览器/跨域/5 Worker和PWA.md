### WebWorker

- 开一个新线程，不会干扰用户界面

- worker会运行在另一个全局上下文中

- 双方通过postMessage发送各自的数据，使用onmessage事件处理函数来响应消息

- worker分为两类：

  - 专用worker：只能被首次生成它的脚本使用
  - 共享worker：可同时被多个脚本使用

  - 语法：

  ```js
  创建一个单独的JavaScript文件，将该文件添加到一个新的Worker中。
  const myWorker = new Worker('worker.js');
  ```

  

  ```JS
  /* main.js */
  // 创建 worker
  const myWorker = new Worker('worker.js');
  
  // 向 worker 传递信息
  myWorker.postMessage('Hello!');
  
  // 接收从 worker 传递过来的信息
  myWorker.onmessage = function(e) {
    console.log(e.data);
  }
  
  
  
  
  /* worker.js */
  // 接收主文件的信息
  self.onmessage = function(e) {
    console.log(e.data);
  
    // 向主文件发送信息
    self.postMessage(workerResult);
  }
  ```

  - 应用场景

  ```JS
  Web Worker用于收集埋点数据,可以用于大量复杂的数据计算,复杂的图像处理,大数据的处理.因为它不会阻碍主线程的正常执行和页面UI的渲染.
  
  埋点数据采集下的使用: 
  可在main.js中收集数据,将收集到的信息通过postMessage的方式发送给worker.js,在woker.js中进行相关运算和整理并发送到服务器端;当然,不使用Web Woker,通过在单页面应用中的index.html中创建iframe也可以实现页面间切换,页面停留时长等数据的采集
  ```



### ServiceWorker

- service worker是浏览器和网络间的代理。
- 只要它被安装且被激活，service worker就可以拦截主文档中发起的任何网络请求

```JS
/* main.js */
// 注册
navigator.serviceWorker.register('/service-worker.js');



/* service-worker.js */
// Install （安装）
self.addEventListener('install', function(event) {
    // ...
});

// Activate （激活）
self.addEventListener('activate', function(event) {
    // ...
});

// 监听主文档中的网络请求
self.addEventListener('fetch', function(event) { // 只要一被拦截，service worker就可以返回一个缓存中的文档作为响应，而不用走网络请求，因此可以让应用离线运行
    // 返回缓存中的数据
    event.respondWith(
        caches.match(event.request);
    );
});
```



### PWA(progressive web app) 渐进式网页应用

- pwa将web和app的优势融合在一起：渐进式、可响应、可离线、实现类似 `App` 的交互、即时更新、安全、可以被搜索引擎检索、可推送、可安装、可链接
- Pwa不是指某项技术，而是指应用了多项技术的Web App. **其核心技术包括 App Manifest、Service Worker、Web Push，等等。**



native app和web端各自缺点：

```JS
1、native app缺点：内容无法被索引、必须下载安装包等

2、web端缺点：卡顿、离线时用户无法访问、无法接受消息推送、移动端无一级入口。（虽然前端做了很多努力：virtual dom/spa/混合编程等）
```



pwa就致力于提升Web App性能，改善用户体验

```JS
PWA应用优点：
1、可安装：可以像原生APP在主屏幕上留有图标
	需要提供manifest.json文件，在html里引用它，
	<link rel="manifest" href="/manifest.json">
2、离线使用：Service Worker,使得可以像Native APP那样可以离线使用、消息推送
```

- 国内案例：豆瓣、饿了么
- 国外：Twitter(2017年就使用此技术，获得大量的用户)



