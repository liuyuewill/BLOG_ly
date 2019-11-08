## BASE

- 使用 TypeScript 编写的文件以 `.ts` 为后缀
- 用 TypeScript 编写 React 时，以 `.tsx` 为后缀

- 写一个 hello.ts 的文件，然后   tsc hello.ts，就会生成一个编译好的文件 `hello.js`

## 规则

- 用 `:` 指定变量的类型，`:` 的前后有没有空格都可以
- TS 只会进行静态检查，错误会在编译时就报出来。即使编译报错，还是会生成对应的编译文件。如果要在报错的时候终止 js 文件的生成，可以在 `tsconfig.json` 中配置 `noEmitOnError` 即可

## 语法基础

#### 原始数据类型

- undefined、null：是所有类型的子类型 （这也是与 `void` 的区别）

  ```JS
  let u: undefined = undefined;
  let n: null = null;
  
  子类型的意思是：
  undefined 类型的变量，可以赋值给 number 类型的变量
  let num: number = undefined; // 这样不会报错
  ```

- string

  ```JS
  let myName: string = 'Tom';
  ```

- boolean

  ```JS
  let isDone: boolean = false;
  ```

- number

  ```JS
  let decLiteral: number = 6;
  
  编译之后为： var decLiteral = 6;
  ```

- symbol

- 空值: 用 void 表示没有任何返回值的函数

  ```JS
  function alertName(): void {
      alert('My name is Tom');
  }
  ```

#### 任意值 any: 表示允许赋值为任意类型

```js
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;  // 会报错

let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7; // 不报错
```

- 任意值的 属性 和 方法：都能随便调用。对任意值的任何操作，返回的内容的类型都是任意值。

