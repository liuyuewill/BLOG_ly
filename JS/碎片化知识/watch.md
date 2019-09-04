```js
资料：https://www.cnblogs.com/jin-zhe/p/9319648.html

1、普通监听某个key（非对象）：
watch:{
	name(){ }
}

2、对象的某个属性
  2.1 ‘liuyue.name’  普通监听的写法
  2.2  computed里写个 lyname(){return liuyue.name},然后watch里写lyname

3、监听对象
handler/deep用起来
```
