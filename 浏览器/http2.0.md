### HTTP0.9 / HTTP1.0  1.1/ HTTP2.0

参考：https://juejin.im/post/5c0ce870f265da61171c8c66

参考：https://mp.weixin.qq.com/s/p6nOfpAo6Xa-bGWPJ1sP-Q

![image-20190920231804251](/Users/liuyue/Library/Application Support/typora-user-images/image-20190920231804251.png)

HTTP/0.9 - 单行协议

- 只支持GET方法；
- 没有首部；
- 只能获取纯文本。



HTTP/1.0 - 搭建协议的框架

- POST

- 用Content-Type指定除html以外的文件类型

- 增加了首部、状态码、权限、缓存、

- 长连接（默认短连接）

  

HTTP/1.1

- 默认长连接；
- OPTIONS
- 强制客户端提供Host首部；
- 管线化；
- Cache-Control、ETag等缓存的相关扩展。



### HTTP1.1的问题

- HTTP1.0 线头阻塞：TCP连接上只能发送一个请求，前面的请求未完成前，后续的请求都在排队等待
- HTTP1.1 管线化：虽然支持了请求并发，但是浏览器很难实现，chrome、firefox等都禁用了管线化
- 头部冗余，采用文本格式，首部未压缩，每一个请求都会带上cookie、user-agent等完全相同的首部。
- 只能客户端主动请求

### HTTP2.0时代

- 多路复用：所有请求都在一个TCP连接上完成，实现了真正的并发，

  ```JS
  HTTP2建立一个TCP连接，一个连接上面可以有任意多个流（stream），消息分割成一个或多个帧在流里面传输。帧传输过去以后，再进行重组，形成一个完整的请求或响应。这使得所有的请求或响应都无法阻塞
  ```

- 头部压缩

  ```JS
  前后端共同维护一个数据字典。如，在传输首部字段的时候，例如要传输method:GET,那我们只需要传输静态字典里面method:GET对应的索引值就可以了，一个字节搞定
  
  第一次传输过user-agent 之后呢，浏览器和服务器端就会把它添加到自己的动态字典中。后续传输就可以传输索引了，一个字节搞定
  ```

- 服务端可主动推送

