## Cookie规避同源策略的方法

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



