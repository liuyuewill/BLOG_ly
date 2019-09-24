1、普通监听某个key（属性的值为非对象）：

```JS
watch:{
	name(){ }
}
```

2、要监听属性（其值为一个对象）的值，的，某个属性

```JS
- ‘liuyue.name’  普通监听的写法
- computed里写个 lyname(){return liuyue.name},然后watch里写lyname
```

3、监听对象 handler/deep用起来

```JS
watch:{
	someObj: {
    handler() {........},
    deep: true
  }
}
```

### 注意事项：

监听的key的值如果是一个数组/对象，要变异它们时，newVal和oldVal会一样，因为新旧值的引用是一样的。

你可以先把旧值先深拷贝出来，再来做一些对比之类的操作

参考：https://juejin.im/post/5ae91fa76fb9a07aa7677543

