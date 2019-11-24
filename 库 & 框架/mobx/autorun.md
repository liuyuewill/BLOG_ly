- 当使用 `autorun` 时，所提供的函数总是立即被触发一次，然后每次它的依赖关系改变时会再次被触发
- `相比：computed(function)` 创建的函数只有当它有自己的观察者时才会重新计算

```JS
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'
numbers.push(4);
// 输出 '10'

disposer(); // !!!!!!!!!!!
numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。
```

- autorun （callback，options?）

  ```JS
  const age = observable.box(10)
  const dispose = autorun(() => {
      if (age.get() < 0)
          throw new Error("Age should not be negative")
      console.log("Age", age.get())
  }, { // options
    	delay：300，
      onError(e) {
          window.alert("Please enter a valid age")
      }
  })
  ```

  