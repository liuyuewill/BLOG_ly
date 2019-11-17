### 类

类只是一个语法糖，得先理解构造函数 + 继承

- 类的所有方法 都定义在类的`prototype`属性上面。

  获取原型的方法：

  ```JS
  通过构造函数： Person.prototype
  通过实例： Object.getPrototypeOf(P1)
  
  可以通过以上方式给原型对象添加新的属性/方法
  ```

  

- 类不存在变量提升： ES6 不会把类的声明提升到代码头部

- this的指向

  类的方法 内部的 this 默认指向实例，但单独使用时，因为类内部为严格模式，所以如果 this 指向全局则其实为undefined。 解决： 

  ```JS
  法一： 箭头函数
  class Obj {
    constructor() {
      this.getThis = () => this; // 把函数定义在 constructor 内，箭头函数定义生效的时候是在 constructor函数执行时，箭头函数所在的运行环境，肯定是实例对象，所以this会总是指向实例对象。
    }
  }
  
  
  法二： 在 constructor 里显式绑定
  class Logger {
    constructor() {
      this.printName = this.printName.bind(this); // 重点
    }
    
    printName(name = 'there') {
      this.print(`Hello ${name}`);
    }
  }
  
  const logger = new Logger();
  const { printName } = logger;
  printName();

  -------------------------------------------
  // 思考题
  window.name = 'window'
  class A {
    constructor(){
      this.name = 'a'
    }
    handle(){
        console.log(this.name)
    }
  }
  let a = new A()
  let fn1 = a.handle
  fn1() // ????




  class B {
    constructor(){
      this.name = 'b'
    }
    handle = () => {
        console.log(this.name)
    }
  }
  let b = new B()
  let fn2 = b.handle
  fn2() // ???
  setTimeout(fn2, 0) // ???

  ```

- static 声明类的静态方法（有一个提案，也用 static 声明类的静态属性）

  刚刚说，类里面所有的方法，其实都是挂在 原型 上的，如果在一个方法前加 static ，此方法就不会被挂在原型上。

  只能通过当前这个 类 来调用 。

  ```JS
  Foo.classMethod()，而不是在 Foo类的实例 上调用
  
  静态方法包含 this 关键字，这个 this 指的是类，而不是实例
  ```

- 实例属性的位置

  ```JS
  一般写实例属性时，我们都会写在 constructor 里，现在有一种更直观的方式，你可以直接写在最外层，但功能和写在constructor 里完全一样，简便之处在于你不用再写 this 了：
  class foo {
    bar = 'hello';
    baz = 'world';
  
    constructor() {
      // ...
    }
  }
  ```

- new.target

  返回`new`命令作用于的那个构造函数

  ```js
  // 另一种写法 new.target !== undefined
  function Person(name) {
    if (new.target === Person) {
      this.name = name;
    } else {
      throw new Error('必须使用 new 命令生成实例');
    }
  }
  
  var person = new Person('张三'); // 正确
  var notAPerson = Person.call(person, '张三');  // 报错
  ```



### 类的继承 extends

```JS
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // super, 调用父类的 constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // super, 调用父类原型上的 toString()
  }
}

// super 表示【父类的构造函数】，用来新建父类的 this 对象
// 只有super方法才能调用父类原型里的方法, 在调用 super 之前，无法使用 this

ES5 ES6 继承的区别：
ES5 : 先创建一个实例对象 this ，再把父类的属性、方法挂在这个 this 对象上 Parent.apply(this)
ES6 : 先将父实例对象的方法和属性 挂到 this 上 super(this)，再子类的构造函数修改 this 指向
```

- 检测【实例与原型】的关系的方法

  ```JS
  Person.prototype.isPrototypeOf(person1)  //true
  Object.getPrototypeOf(person1) == Person.prototype //true
  ```

---

### 类中的 super

- 把 super 当函数调用时：表示 父类 的构造函数。 只能用在子类的构造函数中。

  ```JS
  class A {}
  class B extends A {
    constructor() {
      super(); // super 在这里相当于：A.prototype.constructor.call(this)
    }
  }
  ```

- 把 super 当对象时：用在普通方法中，指向父类的原型对象

  ```JS
  class A {
    p() {
      return 2;
    }
  }
  class B extends A {
    constructor() {
      super();
      console.log(super.p()); // 2 // super 相当于: A.prototype.call(this)
    }
  }
  let b = new B();
  
  // 由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的。 
  // class 上所有的方法 都是挂在原型上的。所以，如果是 super.p 而 p 是写在 constructor上的，那 super.p 就调用不到
  ```

  

----

### 普通对象中的 super

- 我们知道 this 指向: 指向当前对象
- 那super指向呢: 用在对象的方法中时，指向当前对象的【原型对象】

```
学习2个新API：
Object.getPrototypeOf(this).foo
Object.setPrototypeOf(obj, proto);
 
 JavaScript 引擎内部，super.foo等同于：
  - 若foo为属性：Object.getPrototypeOf(this).foo
  - 若foo为方法：Object.getPrototypeOf(this).foo.call(this) // 注意第二个this
```

```js
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
```

---

### super 总结

- 在普通对象中，super 指向【当前对象的原型】
- 在类中
  - super 当方法用：指向【父的构造函数】，且只能用在子的构造函数中
  - super 当对象用：在普通方法中，指向【父的原型】， 在 static 方法中指向【父类】



