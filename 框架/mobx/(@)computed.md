- 如果你想产生一个新值，用 @computed
- 如果你想产生一种效果，用 autorun. 如，打印日志、发起网络请求等
- @computed 特色
  - 不用时，MobX 可以自动地将其垃圾回收（如果你需要的话，可以使用 [`observe`](https://cn.mobx.js.org/refguide/observe.html) 或 [`keepAlive`](https://github.com/mobxjs/mobx-utils#keepalive) 来强制保持计算值总是处于唤醒状态）
  - 新值不可枚举，也不能在继承链中被覆盖

### @computed

```javascript
import {observable, computed} from "mobx";
class OrderLine {
    @observable price = 0;
    @observable amount = 1;
    constructor(price) {
        this.price = price;
    }
    @computed get total() { // @computed, 可以在任意类属性的 getter 上使用
        return this.price * this.amount;
    }
}

// 写法二：
import {decorate, observable, computed} from "mobx";
class OrderLine {
    price = 0;
    amount = 1;
    constructor(price) {
        this.price = price;
    }
    get total() {
        return this.price * this.amount;
    }
}
decorate(OrderLine, {
    price: observable,
    amount: observable,
    total: computed // !!!
})
```



### computed(expression) 函数

- 在返回的对象上使用 `.get()` 来获取计算的当前值
- 或者使用 `.observe(callback)` 来观察值的改变



### 错误处理

如果计算值在其计算期间抛出异常，则此异常将捕获并在读取其值时重新抛出。 强烈建议始终抛出“错误”

```JS
throw new Error('hjfdkalhfd')

// demo
const x = observable.box(3)
const y = observable.box(1)
const divided = computed(() => {
    if (y.get() === 0)
        throw new Error("Division by zero")
    return x.get() / y.get()
})

divided.get() // 返回 3

y.set(0) // OK
divided.get() // 报错: Division by zero
divided.get() // 报错: Division by zero

y.set(2)
divided.get() // 已恢复; 返回 1.5
```

