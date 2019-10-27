### let
- 所声明的变量，只在let命令所在的代码块内有效
- for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。

      for (let i = 0; i < 3; i++) {
        let i = 'abc';
        console.log(i);
      }
      // abc
      // abc
      // abc
- 不存在变量提升。在代码块内，使用let命令声明变量之前，该变量都是不可用的，叫称为“暂时性死区”
- 不允许重复声明
### const
- 声明一个只读的常量
- 不提升
- 同样存在暂时性死区
- 本质：const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动 



```JS
思考：那let的块级作用域是怎么体现呢？
实质就是在块级作用域里改变一下变量名，使之与外层不同

参考：https://github.com/lcxfs1991/blog/issues/9
```
### 声明变量的六种方法
- es5中有2种：var、function
- es6新增4种：let、const、import、class
### 顶层对象的属性
    var命令和function命令声明的全局变量，依旧是顶层对象的属性；
    另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性

    var a = 1;
    // 如果在 Node 的 REPL 环境，可以写成 global.a
    // 或者采用通用方法，写成 this.a
    window.a // 1

    let b = 1;
    window.b // undefined