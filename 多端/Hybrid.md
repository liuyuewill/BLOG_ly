### 混合应用是什么
原生技术和web前端技术结合开发的APP, 就是混合应用
### 现有的混合应用开发方案 3种
- webview
- 用前端开发一些虚拟DOM节点，然后Native拿这些虚拟节点渲染出页面
- 小程序方案：打开个webview ，它会有更多的定制化
  
### Native 和 H5 间互相通信
本质：通过 bridge.js 进行通信

前端会开发好这个 bridge.js 文件，然后给 Native 端，当我们在APP内一打开这个 Webview, Native 端就会把bridge.js这个文件注入到我们的H5代码里，类似 script src="bridge.js"

#### H5 -> Native
本质：Native 端可以拦截 URL
Native 和 H5 可以约定一种协议，当 Webview 通过这个特定的协议发送请求时，会被 Native 端拦截，这样一个方向的通信就实现了
#### Native -> H5
Native 拦截到 H5 传过来的参数后，会进行处理，返回一个res。
H5 在发送请求时是这样：

```JS
'xiuxiu://..', 参数, (res) => {}     // H5里会写有一个回调函数，它就是用来处理Native返回来的结果的
```

那这个回调是怎么拿到 Native 的处理结果的？其实都发生在 bridge.js 内：

Natvie 根据传过去的参处理完后，会调用 bride.js 内的 postMessage 函数（又有重点：Native能执行我们的js代码），postMessage 函数就会让 H5执行你之前写的那个回调函数

