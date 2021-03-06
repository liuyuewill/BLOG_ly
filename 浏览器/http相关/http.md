#### Web 服务器会为所有 HTTP 对象数据附加一个 MIME 类型
MIME：主要的对象类型 + 一个特定的子类型，当浏览器根据它处理这个对象，如：

- HTML  text/html
- 普通的 ASCII 文本文档 text/plain
- JPEG image/jpeg
- GIF image/gif
- Apple 的 QuickTime 电影  video/quicktime 
- 微软的 PowerPoint 演示文件  application/vnd.ms-powerpoint

#### URI 统一资源标识符
有两种形式，分别称为 
- URL 统一资源定位符
- URN 统一资源名：特定内容的唯一名称使用 的，与目前的资源所在地无关（特定内容的唯一名称使用的，与目前的资源所在地无关

#### http方法 ，最常用HTTP/1.1
- GET
- PUT: 在服务器更新资源（客户端提供改变后的完整资源
- PATCH：在服务器更新资源（客户端提供改变的属性
- POST
- DELETE
- HEAD
- OPTIONS

#### http状态码

- 扫盲

```js
200 成功 OK
202 服务器已经收到请求，但尚未处理
204 服务器成功处理了请求，没有返回任何内容
300+ 表示要完成请求，还需要进一步操作，代码状态通常为重定向
400+ 请求的错（请求可能出错了），妨碍服务器处理
500+ 服务器的错，服务器在尝试请求处理时发生内部错误
500 服务器内部出错（如测试环境的服务器挂了
```

```js
1xx：指示信息–表示请求已接收，继续处理。
2xx：成功–表示请求已被成功接收、理解、接受。
3xx：重定向–要完成请求必须进行更进一步的操作。
4xx：客户端错误–请求有语法错误或请求无法实现。
5xx：服务器端错误–服务器未能实现合法的请求。
```

- 平时遇到比较常见的状态码有:

```js
200, 服务器正常响应
204,  服务器成功处理了请求，但没有返回任何内容。（无内容）

301, 永久重定向
服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来响应以后的请求。 会自动将请求者转到不同的位置
302, 临时重定向
服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来响应以后的请求
304, 该资源在上次请求之后没有任何修改（这通常用于浏览器的缓存机制，使用GET请求时尤其需要注意）
```


​    
```js
400, 服务器不理解请求的语法（错误请求）
401, 请求要求身份验证（未授权）
403, 服务器拒绝请求（禁止）
404, 需要访问的资源不存在（未找到）

500 服务器遇到错误，无法完成请求。

502（错误网关）
服务器作为网关或代理，从上游服务器收到无效响应。比如你要翻墙
```

- 深入

https://www.jianshu.com/p/995a3000f7d6?from=timeline&isappinstalled=0

    301和302的区别：
    览器在拿到服务器返回的这个状态码后会自动跳转到一个新的URL地址（用户看到的效果就是他输入的地址A瞬间变成了另一个地址B）
    301表示旧地址A的资源已经被永久地移除了（这个资源不可访问了）
    302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B
    
    使用301跳转的场景：
    1）域名到期不想续费（或者发现了更适合网站的域名），想换个域名。
    2）在搜索引擎的搜索结果中出现了不带www的域名，而带www的域名却没有收录，这个时候可以用301重定向来告诉搜索引擎我们目标的域名是哪一个。
    3）空间服务器不稳定，换空间的时候。
    
    使用302容易发生url劫持，就是你输入aurl,302到burl，可能burl太长太滥，直接arul就显示了burl的内容。导致aurl相当于偷了burl的内容。

#### 连接TCP/IP
报文是如何通过传输控制协议 (Transmission Control Protocol，TCP)连接从一个地方搬移到另一个地方去的？

- HTTP 是个应用层协议。HTTP 无需操心网络通信的具体细节
- TCP/IP传输层协议。它把联网的细节都交给了通用、可靠的因特网传输协议 TCP/IP。

只要建立了 TCP 连接，客户端和服务器之间的报文交换就不会丢失、不会被破坏， 也不会在接收时出现错序了。

##### 1、怎么建起TCP连接 ： ip+端口号，建起一条TCP连接
在 HTTP 客户端向服务器发送报文之前，需要用网际协议(Internet Protocol，IP) ==ip地址(通过url)+端口号(默认端口号是 80)==，在客户端和服务器之间建立一条 TCP/IP 连接。

##### 2、基本的浏览器连接处理
    (a) 浏览器从 URL 中解析出服务器的主机名;
    (b) 浏览器将服务器的主机名转换成服务器的 IP 地址; 
    (c) 浏览器将端口号(如果有的话)从 URL 中解析出来; 
    (d) 浏览器建立一条与 Web 服务器的 TCP 连接;
    (e) 浏览器向服务器发送一条 HTTP 请求报文;
    (f) 服务器向浏览器回送一条 HTTP 响应报文;
    (g) 关闭连接，浏览器显示文档。
#### 六、其他web应用
##### 1、代理
处在客户端-服务端中间
- 可能会修改客户端发出的请求
- 还可以对请求和响应进行过滤

##### 2、缓存
下一个请求同一文档的客户端 就可以享受缓存的私有副本所提供的服务了
##### 3、网关gateway
通常用于 将 HTTP 流量转换成其他的协议。客户端可能并不知道自己正在与一个网关进行通信

#### 七、HTTP缓存机制=>浏览器缓存机制
https://mp.weixin.qq.com/s/d2zeGhUptGUGJpB5xHQbOA?