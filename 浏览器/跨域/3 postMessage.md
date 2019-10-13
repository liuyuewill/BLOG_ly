### postMessage （HTML5的API）

- 发送数据

```JS
otherWindow.postMessage(message, targetOrigin, [transfer]);

otherWindow: 窗口的引用
- iframe的contentWindow属性
- 执行window.open返回的窗口对象
- window.frames

```

- 接收消息

```JS
监听message事件的发生

window.addEventListener("message", receiveMessage, false) ;

function receiveMessage(event) {
     var origin= event.origin;
     console.log(event);
}
event的几个常用属性：
- data :   指的是从其他窗口发送过来的消息对象;
- type:   指的是发送消息的类型;
- source:   指的是发送消息的窗口对象;
- origin:  指的是发送消息的窗口的源
```



