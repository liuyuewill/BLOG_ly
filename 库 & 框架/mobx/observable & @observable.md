### observable、  @observable 装饰器

将一个数据结构转换成可观察的，即，监听某些类型的值。（带 @ 叫装饰器）

- observable (value)
  - value 值可以是JS基本数据类型、引用类型、普通对象、类实例、数组和映射。
  - value 的值类型不同，observable(value) 的返回值类型也不同

```JS
const person = observable({
    firstName: "Clive Staples",
    lastName: "Lewis"
});
person.firstName = "C.S.";
```

- @observable classProperty = value
  - 在 ES7 或者 TypeScript 类属性中属性
  - 可用在【实例字段】 和【属性 getter】 上

```JS
import { observable, computed } from "mobx" // 你必须要先引用进来

class OrderLine {
    @observable price = 0
    @observable amount = 1

    @computed get total() {
        return this.price * this.amount
    }
}
```


## observable

#### observable (object)

- 另一种形式：observable.object 

  - observable.object , 会自动将 getter 属性推导成计算属性

    ```js
    const orderLine = observable.object({
        price: 0,
        amount: 1,
        get total() {
            return this.price * this.amount
        }
    })
    ```

- 它引入的 observable 属性默认是使用 `deep` 调节器的。`deep` 调节器主要是为任何新分配的值递归调用 `observable(newValue)`。 会依次使用 `deep` 调节器...



 #### observable(arr)

 也是递归的，所以数组中的所有(未来的)值都会是可观察的

```JS
无论如何 Array.isArray(observable([])) 都将返回 false
```



#### 如果不需要将对象转变成 observable，使用 `ref` 调节器

```JS
class Message {
    @observable message = "Hello world"
    // 虚构的例子，如果 author 是不可变的，我们只需要存储一个引用，不应该把它变成一个可变的 observable 对象
    @observable.ref author = null
}
```



### observable(map)



### observable.box(value)：box 接受任何类型的值，并把值存在 box 里

- `.get()` - 返回当前值
- `.set(value)` - 替换当前存储的值并通知所有观察者
- `.observe(callback: (change) => void, fireImmediately = false): disposerFunction` - 注册一个观察者函数，每次存储值被替换时触发。返回一个函数以取消观察者

```JS
import {observable} from "mobx";

const cityName = observable.box("Vienna");
console.log(cityName.get());
// 输出 'Vienna'
cityName.observe(function(change) {
    console.log(change.oldValue, "->", change.newValue);
});
cityName.set("Amsterdam");
```



## 装饰器 decorators

定义 observable 对象的属性 的行为

```JS
import {observable, autorun, action} from "mobx";

// 写法一
var person = observable({
    // observable 属性:
    name: "John",
    age: 42,
    showAge: false,
    // 计算属性:
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    },
    // 动作:
    setAge(age) {
        this.age = age;
    }
}, {
    setAge: action
});

---------------------------------------------------------------

// 写法二
class Person {
    name = "John"
    age = 42
    showAge = false
    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    }
    setAge(age) {
        this.age = age;
    }
}
// 使用 decorate 时，所有字段都应该指定 (毕竟，类里的非 observable 字段可能会更多)
decorate(Person, {
    name: observable,
    age: observable,
    showAge: observable,
    labelText: computed,
    setAge: action
})
```



## .observe (callback)

```JS
import { observable } from "mobx";
const cityName = observable.box("Vienna");

// 输出 'Vienna'
cityName.observe(change => { // observe
  console.log(change.oldValue);
  console.log(change.newValue);
});

cityName.set('henan')
```

