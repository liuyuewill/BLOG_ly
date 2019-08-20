### 属性的简洁表示法
    let obj = {
      birth,
      sayhello(){...}
    }
### 属性名key的表达式
    es6:
    let propKey = 'foo';
    let obj = {
      [propKey]: true,
      ['a' + 'bc']: 123,
      'first word': 'hello',
      ['h' + 'ello']() {
        return 'hi';
      }
    };

    而es5:只能用标识符定义属性名。
    var obj = {
      foo: true,
      abc: 123
    };
    但es6允许用表达式定义属性名，但要放在[]内

### 属性名表达式与简洁表示法，不能同时使用
    // 报错
    const foo = 'bar';
    const bar = 'abc';
    const baz = { [foo] };

    // 正确
    const foo = 'bar';
    const baz = { [foo]: 'abc'};
### 属性的可枚举性
引入“可枚举”（enumerable）概念目的，让某些属性可规避掉for...in操作，不然所有内部属性和方法都会被遍历到。如，对象原型的toString方法，以及数组的length属性

    let obj = { foo: 123 };
    Object.getOwnPropertyDescriptor(obj, 'foo')
    //  {
    //    value: 123,
    //    writable: true,
    //    enumerable: true,
    //    configurable: true
    //  }

目前，有四个操作会忽略enumerable为false的属性

es5中的：
- for...in：自身 + 继承 + 可枚举（不含 Symbol 属性）
- Object.keys()：自身 + 可枚举
- JSON.stringify()：只串行化对象自身 + 可枚举

es6中的：
- Object.assign()： 自身 + 可枚举
- ES6 规定，所有 Class 的原型的方法都是不可枚举的

### 对象属性的遍历
- for...in：自身 + 继承 + 可枚举（不含 Symbol 属性）
- Object.keys(obj)： 自身 + 可枚举
- Object.getOwnPropertyNames(obj)：自身 + 【不】可枚举
- Object.getOwnPropertySymbols(obj)：自身 + 含 Symbol 属性
- Reflect.ownKeys(obj)： 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。
- 遍历的次序规则

      先按【数值键】，按照数值升序排列。
      再按【字符串键】，按照加入时间升序排列。
      最后【Symbol键】，按照加入时间升序排列。

      Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
      // ['2', '10', 'b', 'a', Symbol()]
### super关键字
- this: 指向当前对象

- super: 指向当前对象的原型对象，表原型对象时，只能用在对象的方法之中

      学习2个新API：
      Object.getPrototypeOf(this).foo
      Object.setPrototypeOf(obj, proto);


      JavaScript 引擎内部，super.foo等同于：
      - 若foo为属性：Object.getPrototypeOf(this).foo
      - 若foo为方法：Object.getPrototypeOf(this).foo.call(this) // 注意第二个this


      例子：
      const proto = {
        x: 'hello',
        foo() {
          console.log(this.x);
        },
      };

      const obj = {
        x: 'world',
        foo() {
          super.foo();
        }
      }

      Object.setPrototypeOf(obj, proto);
      obj.foo() // "world"
### 解构赋值
- 解构赋值从一个对象取值，将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和它们的值，都会【浅】拷贝到新对象上面。

      let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
      x // 1
      y // 2
      z // { a: 3, b: 4 }
- 解构赋值必须是最后一个参数

      let { ...x, y, z } = someObject; // 句法错误
- 用处：扩展某个函数的参数

      function baseFunction({ a, b }) {
        // ...
      }
      function wrapperFunction({ x, y, ...restConfig }) {
        // 使用 x 和 y 参数进行操作
        // 其余参数传给原始函数
        return baseFunction(restConfig);
      }

### 扩展运算符
- 取出参数对象的所有可遍历属性，拷贝到当前对象之中。

      let z = { a: 3, b: 4 };
      let n = { ...z };
      n // { a: 3, b: 4 }
- 扩展运算符的解构赋值，不能复制继承它原型对象的属性

      let o1 = { a: 1 };
      let o2 = { b: 2 };
      o2.__proto__ = o1;
      let { ...o3 } = o2;
      o3 // { b: 2 }
      o3.a // undefined
- 扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式
- ...等同于使用Object.assign()

      let m = {a:1,b:2}
      let n = {...m} 等同于 let n = Object.assign({}, m)
- 如果还要拷贝原型上的属性

      Object.assign()只能浅拷贝自身可枚举属性。如果还要拷贝原型上的属性，
      const clone2 = Object.assign(
        Object.create(Object.getPrototypeOf(obj)), // 生成一个空对象{}，这个{}的原型对象是 -> getPrototypeO获取到的原型对象
        obj
      );
      或者
      const clone3 = Object.create(
        Object.getPrototypeOf(obj),
        Object.getOwnPropertyDescriptors(obj)
      )


      - Object.getPrototypeOf(objheihei) 返回objheihei的原型对象，如果没有继承属性，则返回 null
      - Object.create(proto[, propertiesObject])方法创建一个新对象
        - proto 新创建对象的原型对象。
        - propertiesObject
        可选。如果没有指定为 undefined，则是要添加到新创建对象的可枚举属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数
- ...可合并对象

      let ab = { ...a, ...b };
***
## 对象新增方法
- Object.is()

      es5中只有 ==（会转换类型）， ===（NaN不等于自身，以及+0等于-0）
      es6中：
        Object.is(+0, -0) // false
        Object.is(NaN, NaN) // true
- Object.assign(): 自身 + 可枚举
    - 为对象添属性/方法
    - 合并对象
    - 浅复制对象
    - 为属性指定默认值
- Object.getOwnPropertyDescriptors()

> 返回指定对象所有自身属性（非继承属性）的描述对象

      const obj = {
        foo: 123,
        get bar() { return 'abc' }
      };

      Object.getOwnPropertyDescriptors(obj)得：
      { 
        foo:{ 
              value: 123,
              writable: true,
              enumerable: true,
              configurable: true 
            },
        bar:{ 
            get: [Function: get bar],
            set: undefined,
            enumerable: true,
            configurable: true 
          } 
      }
      主要是为了解决Object.assign()无法正确拷贝get属性和set属性的问题。

- 思考：如何拷贝一个对象，及其【原型】上的属性

      我现在会：
      const obj = {
        __proto__: prot,
        foo: 123,
      };


      let objNew = Object.assign(
        Object.create(Object.getPropertyof(obj))
        ,
        obj
      )


      现在有更简洁的写法：
      const obj = Object.create(
        obj,
        Object.getOwnPropertyDescriptors({
          foo: 123,
        })
      );
- 设置【原型对象】为某指定对象
  - var obj = Object.create(someOtherObj);
  - Object.setPrototypeOf()（写操作）
  - Object.getPrototypeOf()（读操作）
  - Object.create()（生成操作）
- Object.keys()
- Object.values()

      const obj = { 100: 'a', 2: 'b', 7: 'c' }; // 注意返回数组的成员顺序
      Object.values(obj)
      // ["b", "c", "a"]

      Object.create（pro, {a:1}）第二个参数，如果不显式声明，默认是不可遍历
      因为p的属性描述对象的enumerable默认是false
      Object.values不会返回这个属性。只要把enumerable改成true，Object.values就会返回属性p的值。

      const obj = Object.create(
        {}, 
        {p:
          {
            value: 42,
            enumerable: true // 重要
          }
        }
      );
      Object.values(obj) // [42]
- Object.entries()
- Object.fromEntries()：貌似需要babel转码，目前浏不支持

      Object.entries()的逆运算

      一大用处：
      var paramsString = "q=URLUtils.searchParams&topic=api"
      var searchParams = new URLSearchParams(paramsString); 

      searchParams为一个数组，item也是数组
      // [["q", "URLUtils.searchParams"], ["topic", "api"]]

      Object.fromEntries(searchParams)为：
      {
        "q": "URLUtils.searchParams",
        "topic": "api"
      }
