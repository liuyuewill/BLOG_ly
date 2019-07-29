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
