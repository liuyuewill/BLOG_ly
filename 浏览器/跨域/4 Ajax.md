Ajax跨域的三种方式：

- CORS
- JSONP
- Websocket



### CORS

浏览器向跨源服务器，发出[`XMLHttpRequest`](http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html)请求，从而克服了AJAX只能[同源](http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html)使用的限制

需浏览器 、服务器同时支持

CORS请求分为2种：

- 简单请求

  ```JS
  要同时满足这两点：
  1、请求方法为之一：HEAD/GET/POST
  2、Http的头信息不能超出以下字段：
  	Accept: 如text/plain
    Accept-Language: 如en-US
    Content-Language：
    Last-Event-ID:
    Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
  
  --------------------------------------------------------------------------------------------
  扩展知识
  http通用头：
    Cache-Control、
    Connection: close/Keep-Alive   请求完之后，是关闭此连接，还是继续保持连接、
    Via：列出从客户端到 OCS 或者相反方向的响应经过了哪些代理服务器，他们用什么协议（和版本）发送的请求
    Date
  
    
  http请求头：
    Accept：客户端可以接收的数据类型（如果内容是：*，表示接收所有类型）
    Accept-Encoding:gzip,deflate,sdch 浏览器能够接收什么格式的压缩的数据
    Host：客户端本次访问的WEB服务器的域名/IP 地址和端口号。如Host：rss.sina.com.cn、
    Referer：当前页面来自哪个页面
    If-None-Match、
    If-Modified-Since、
    Cookie
  
    
  http响应头：
  	Allow：服务器支持哪些请求方法（如GET、POST等）
  	Server：服务器表明自己是什么软件及版本等信息。例如：Server：Apache/2.0.61 (Unix)
  	Content-Encoding       服务器当前返回给客户端的数据压缩格式
    Refresh: 1;url=http://www.it315.org 　　 隔多少秒以后，让当前页面去访问哪个地址
    Set-Cookie:SS=Q0=5Lb_nQ; path=/search     和cookie相关的头
  	Content-Type: text/html;  返回的数据的类型
    Content-Length
    charset=GB2312  字符集编码方式
  	if-modified、
  	etag
  	
  
  ```

  ```JS
  简单请求过程：
  在请求头里加个字段Origin: http://api.bob.com  本次请求来自哪个源（协议 + 域名 + 端口）
  1、Origin源不通过 -> 正常的HTTP回应 -> 响应头里无Access-Control-Allow-Origin字段 -> 抛出一个错误,被XMLHttpRequest的onerror回调函数捕获（状态码有可能是200）
  
  2、Origin源通过 -> 响应头里多出几外字段均以Access-Control- 开头：
     - Access-Control-Allow-Origin: http://api.bob.com 或 *
  
     - Access-Control-Allow-Credentials: true
  			表示是否允许发送Cookie，默认Cookie不包括在CORS请求之中。			
        同时，你请求时也要设置
     		var xhr = new XMLHttpRequest();
  			xhr.withCredentials = true;
  
     - Access-Control-Expose-Headers: FooBar【CORS请求时，XMLHttpRequest对象的getResponseHeader()			方法只能拿到6个基本字段，如果想获得其他字段，就得通过这个字段来指定】
     
     
     如果要发送Cookie，Access-Control-Allow-Origin就不能设为星号，必须指定明确的、与请求网页一致的域名。
  	 同时，不要忽略，Cookie也遵循同源策略
  ```

  

- 非简单请求

  ```js
  比如请求方法是PUT或DELETE
  或者Content-Type: application/json。
  
  会在正式通信以前，发生"预检"请求（preflight）
  1、"预检"请求的请求头：
      OPTIONS /cors HTTP/1.1
      Origin: http://api.bob.com
      Access-Control-Request-Method: PUT
      Access-Control-Request-Headers: X-Custom-Header
  
  2、"预检"请求通过 -> 响应头：
      Access-Control-Allow-Origin: http://api.bob.com
      Access-Control-Allow-Methods: GET, POST, PUT
      Access-Control-Allow-Headers: X-Custom-Header
      Access-Control-Allow-Credentials: true
      Access-Control-Max-Age: 1728000
  
  被否定 -> 
    XMLHttpRequest cannot load http://api.alice.com.
  	Origin http://api.bob.com is not allowed by Access-Control-Allow-Origin.
  
  3、正式请求
  一旦服务器通过了"预检"请求，以后每次浏览器正常的CORS请求，就都跟简单请求一样, 每次请求都会带上Origin ,每次响应都会带上Access-Control-Allow-Origin
  ```

### JSONP

没有CORS强大，缺陷：只支持GET请求

```JS
function createScriptTag(url){
  const tag = document.createElement('script')
  tag.setAttribute('type', 'text/javascript')
  tag.src = url
  document.body.appendChild(tag)
}

window.onload = function(){
  createScriptTag('http://example.com/ip?callback=foo')
}

function foo(data) { // data为跨域传回来的数据
  
}
```



### Websocket

一种通信协议，协议前缀：ws://   或 wss://，只要服务器支持就可以

学习路径：http://www.ruanyifeng.com/blog/2017/05/websocket.html

```JS
var ws = new WebSocket("wss://echo.websocket.org");

ws.onopen = function(evt) { 
  console.log("Connection open ..."); 
  ws.send("Hello WebSockets!");
};

ws.send('your message');

ws.onmessage = function(evt) {
  console.log( "Received Message: " + evt.data);
  ws.close();
};

ws.onclose = function(evt) {
  console.log("Connection closed.");
}; 
```

