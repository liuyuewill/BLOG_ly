- state

- computed

  ```JS
  你有一个值，该值的结果依赖于state，并且该值也需要被obserable，那么就使用computed
  
  通常应该尽可能的使用计算属性，并且由于其函数式的特点，可以最大化优化性能
  
  const Mobx = require("mobx");
  const { observable, autorun, computed } = Mobx;
  var numbers = observable([1, 2, 3]);
  var sum = computed(() => numbers.length);
  autorun(() => console.log(sum.get()));
  // 输出 '3'
  numbers.push(4);
  // 输出 '4'
  numbers[0] = 1;
  
  
  如果计算属性依赖的state没改变，或者该计算值没有被其他计算值或响应（reaction）使用，computed便不会运行。在这种情况下，computed处于暂停状态，此时若该计算属性不再被observable。那么其便会被Mobx垃圾回收。
  ```

- autorun

  ```JS
  和computed类似，每当依赖的值改变时，其都会改变.
  不同的是，autorun没有了computed的优化
  (依赖值未改变的情况下也不会重新运行，但不会被自动回收)
  
  原理：Mobx的核心就是通过observable观察某一个变量，当该变量产生变化时，对应的autorun内的回调函数就会发生变化。
  
  const Mobx = require("mobx");
  const { observable, autorun } = Mobx;
  const ob = observable({ a: 1, b: 1 });
  autorun(() => {
    console.log("ob.b:", ob.b);
  });
  ob.b = 2;
  ```

- action

  ```JS
  Mobx并不强制所有state的改变必须通过action来改变
  多人协作的项目通过API：Mobx.configure({enforceActions: true})
  ```

  

- reaction