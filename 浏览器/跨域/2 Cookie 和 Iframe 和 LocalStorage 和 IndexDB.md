## Cookie 和 Iframe 和 LocalStorage 和 IndexDB 规避同源策略的方法

Cookie是通过响应头里set-cookie种在浏览器里的，下回浏览器请求头里就会带上Cookie字段

只有同源（三个条件），才能共享Cookie

### 只有一级域名相同，二级域名不同，怎么共享

- 法一前端脚本设置

```JS
1、2个网页同时设置：
	document.domain = 'example.com';
2、然后A网页：
	document.cookie = "test1=hello";
3、这时B网页就能访问A网页设的Cookie:
	var allCookie = document.cookie;

这种方法只适用于 Cookie 和 iframe 窗口
```

- 法二：服务器也可以在设置Cookie时指定Cookie的所属域名为一级域名

```JS
Set-Cookie: key=value; domain=.example.com; path=/
```

### 那如果完全不同源呢

三种方法：

- 片段标识符
- Window.name
- 跨文档通信postMessage

```JS
1、片段标识符：URL的#号后面的部分，如http://example.com/x.html#fragment的#fragment
如果只是改变#后面的值，页面不会刷新
父传子：
父：var src = originURL + '#' + data;
	 document.getElementById('myIFrame').src = src;
子监听即可：
  window.onhashchange = checkMessage;
  function checkMessage() {
    var message = window.location.hash;
    // ...
  }

子传父相反即可

2、window.name: 不管是否同源，只要在同一个窗口里，前一个网页设置了，后一个网页就能读到这个属性

3、postMessage

```



