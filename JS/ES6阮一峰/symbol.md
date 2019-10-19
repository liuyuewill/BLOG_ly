    let s = Symbol();

    typeof s
    // "symbol"

    Symbol函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示
    let s1 = Symbol('foo');
    let s2 = Symbol('bar');

    s1 // Symbol(foo)
    s2 // Symbol(bar)
### 作为属性名的 Symbol
    let mySymbol = Symbol();

    // 第一种写法
    let a = {};
    a[mySymbol] = 'Hello!';

    // 第二种写法
    let a = {
      [mySymbol]: 'Hello!'
    };
### Symbol 值作为对象属性名时，不能用点运算符
### 属性名的遍历
Symbol 作为属性名，该属性不会出现在
for...in、for...of循环中，
也不会被Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()返回

- Object.getOwnPropertySymbols: 返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值
- Reflect.ownKeys方法可以返回所有类型的键名，包括常规键名和 Symbol 键名

### 应用场景
- 为对象定义一些非私有的、但又希望只用于内部的方法
- 单例模式时，需要将一个实例挂在某个变量上面，如果害怕被改写，就可以考虑用symbol值作为对象的key
```JS
  // mod.js
  function A() {
    this.foo = 'hello';
  }
  if (!global._foo) {
    global._foo = new A();
  }
  module.exports = global._foo;

  但在其他文件中，global._foo = { foo: 'world' };像这样，很容易被改写



  优化：
  // mod.js
  const FOO_KEY = Symbol('foo');
  function A() {
    this.foo = 'hello';
  }
  if (!global._foo) {
    global[FOO_KEY] = new A();
  }
  module.exports = global[FOO_KEY];
      ```