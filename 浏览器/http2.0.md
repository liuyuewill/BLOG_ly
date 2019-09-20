### HTTP0.9 / HTTP1.0 / HTTP2.0

参考：https://juejin.im/post/5c0ce870f265da61171c8c66

![image-20190920231804251](/Users/liuyue/Library/Application Support/typora-user-images/image-20190920231804251.png)

HTTP/0.9 - 单行协议
HTTP于1990年问世，那时候HTTP非常简单：只支持GET方法；没有首部；只能获取纯文本。



HTTP/1.0 - 搭建协议的框架
1996年，HTTP正式被作为标准公布，版本为HTTP/1.0。1.0版本增加了首部、状态码、权限、缓存、长连接（默认短连接）等规范，可以说搭建了协议的基本框架。

HTTP/1.1 - 进一步完善
1997年，1.1版本接踵而至。1.1版本的重大改进在于默认长连接；强制客户端提供Host首部；管线化；Cache-Control、ETag等缓存的相关扩展。



### HTTP1.1的问题

- 线头阻塞：TCP连接上只能发送一个请求，前面的请求未完成前，后续的请求都在排队等待
- 

