### 混合应用是什么
混合了 Native技术 与 Web技术 进行开发的移动应用

### 混合开发的优点

- 热更新
- 可以离线使用
- 产品的核心能力如处理照片功能非常强大，单纯的H5处理能力不够，所以可能通过 Hybrid 技术来强化 H5
- 有一些功能简单，UI简单的需求，用原生技术开发成本比H5成本大

### 现有的混合应用开发方案 3种
- webview
- 用前端开发一些虚拟 DOM节点，然后 Native 拿这些虚拟节点进行原生渲染
- 小程序方案：打开个webview ，它会有更多的定制化
  
### Native 和 H5 间互相通信

**整体流程：原理-定制协议-拦截协议-参数传递-回调机制** 

前端会开发好这个 bridge.js 文件，然后给 Native 端，当我们在APP内一打开这个 Webview, Native 端就会把bridge.js 这个文件注入到我们的 H5 代码里，类似 script src="bridge.js"

#### H5 -> Native
- 实现原理：**在 WebView 中发出的网络请求，客户端都能进行监听和捕获**

- 协议的定制：xxcommand://xxxx?param1=1&param2=2

  ```JS
  定制协议时需注意：
  1、不要使用 location.href 发送协议，因为无法并发。以 iframe 的形式发送协议
  2、要在客户端设置域名的白/黑名单，保证安全性，以防第三方调用
  3、WebView 对 URL 会有长度的限制，如果通过 search参数 传参数，url过长的话，会被截断。所以需要【制定新的参数传递规则】：使用的是函数调用的方式
  	实现原理：Native 可以直接调用 JS 方法并直接获取函数的返回值。
  ```

- 协议拦截：

  ```JS
  安卓和IO S通过 API 对 Webview 发出的请求进行拦截会有区别：
  IOS上: shouldStartLoadWithRequest
  Android: shouldOverrideUrlLoading
  
  发现是定制协议时，就会进行参数解析，并进行相关方法的调用，完成协议的功能
  ```

- 协议回调

  协议是用来发请求的，需要对应的回调机制，会用到 window.addEventListener 和 window.dispatchEvent 2个API

  （自定义DOM事件，可参考学习：[https://www.zhangxinxu.com/wordpress/2012/04/js-dom%e8%87%aa%e5%ae%9a%e4%b9%89%e4%ba%8b%e4%bb%b6/](https://www.zhangxinxu.com/wordpress/2012/04/js-dom自定义事件/)）

  ```JS
  1、发送协议时，通过这个协议的唯一标识注册一个自定义事件，并将【回调】绑定在这个事件上
  2、Native 端完成参数解析后，会调用 Bridge 的 dispatch API, 直接携带result触发该协议绑定的回调
  ```

![image-20191008223246896](/Users/liuyue/Library/Application Support/typora-user-images/image-20191008223246896.png)

### Native ->H5

 **Native 可以通过 WebView API直接执行 Js 代码**

### 包更新机制

- H5在开发后，直接打包将包上传到对应的服务器上
- 提供**包下载且解压到对应目录**的服务
- 服务端提供线上最新版本号 和 下载包的URL
- 每次打开页面时，H5请求接口**获取线上最新代码包版本号**，并与本地包进行**版本号比对**，当线上的版本号 大于 本地包版本号时，**发起包下载协议**

### 代理请求

H5 在请求时可能会发生跨域问题（因为跨域是浏览器的限制），但 Native 就不会，所以可以使用代理，会自动**携带已登录用户的 token 和 uid 等参数**





参考大佬文章：https://github.com/xd-tayde/blog/blob/master/hybrid-2.md