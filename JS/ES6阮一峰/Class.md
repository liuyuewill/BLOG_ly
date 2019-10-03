### 类

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
  ```

- static 声明类的静态方法（有一个提案，也用 static 声明的静态属性）

  刚刚说，类里面所有的方法，其实都是挂在 原型 上的，如果在一个方法前加 static ，此方法就不会被挂在原型上。

  只能通过当前这个 类 来调用 。

  ```JS
  可以直接在Foo类上调用（Foo.classMethod()），而不是在Foo类的实例上调用
  
  静态方法包含this关键字，这个this指的是类，而不是实例
  ```

- 实例属性的位置

  ```JS
  一般写实例属性时，我们都会写在 constructor 里，现在有一种更直观的方式，你可以直接写在最外层，但功能和写在constructor 里完全一样：
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



### 类的继承

