### Iterator

一种统一的接口机制，来处理不同的数据结构。遍历器 Iterator 就是这种机制，任何数据结构只要部署了Iterator接口，就可以完成遍历操作。

目前有 Object 、  Array 、Set 、Map四种表示“集合”的数据结构。

### Iterator 对象的作用

- 提供统一的接口
- 使得遍历时按某种排序
- ES6 里有 for-of, 提供这种消费

### Iterator 的遍历过程

1. 生成一个遍历器指针对象
2. 第一次调用这个指针对象的next()方法，可将指针指向这遍历器对象的第一个成员，并且返回当前成员的val和done
3. 第二次……（同第2步）

```JS
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return { // 重点：返回了一个遍历器对象
    next: function() { // next 方法用来移动指针，next方法也会返回一个对象
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
      // 其实可以简写为：
      return nextIndex < array.length ?
        {value: array[nextIndex++]:{done: true};
    }
  };
}

知识点：
我们平时在for循环里常写地是 i++, 是先计算表达式的值，再自身加1，++i是正好相反的
```

### 默认的 Iterator 接口

- 默认的 Iterator 接口，为所有数据结构，提供了一种统一的访问机制，即`for...of`循环。

- 当你使用 for-of 时，该循环会自动去寻找 Iterator 接口。

- 只要这种数据结构部署了 Iterator 接口，则这种数组结构就是“可遍历的”。那怎样才算部上了呢？！！！！！一个数据结构只要具有`Symbol.iterator`属性，就算是部上了。

  ```JS
  const obj = {
    [Symbol.iterator] : function () {
      return {
        next: function () {
          return {
            value: 1,
            done: true
          };
        }
      };
    }
  };
  则 obj 是可遍历的。执行[Symbol.iterator]这个函数，就会生成一个遍历器对象，根本特征就是有next方法。
  
  小结：凡是部署了Symbol.iterator属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象。
  ```

- 原生具备 Iterator接口的数组结构：

  - Array (没有对象，所以数组可以用for of遍历，但对象不能用for of)

    ```JS
    数组的Symbol.iterator属性：
    let arr = ['a', 'b', 'c'];
    let iter = arr[Symbol.iterator]();
    
    iter.next() // { value: 'a', done: false }
    iter.next() // { value: 'b', done: false }
    iter.next() // { value: 'c', done: false }
    iter.next() // { value: undefined, done: true }
    ```

  - Map

  - Set

  - String

  - arguments对象

  - NodeList对象

- 那对象为什么没有部署Iterator接口？？该怎么遍历对象？？？

  原因：因为对象的属性哪个先遍历，哪个后遍历，是不确定的，需开发手动指定。

  方法：手动加一个遍历器呗！！把 Symbol.iterator 这个属性加到对象自身或者原型链上

  ```JS
  如果是类数组
  法一：你可以 通过借用如： [Symbol.iterator]: Array.prototype[Symbol.iterator]，注：普通对象(指没有数字键和length属性的对象)部署数组的Symbol.iterator方法，并无效果
  法二：通过Array.from()转成真数组就可以了嘛
  ```

  

  

### 默认调用 Iterator 接口的场合（即`Symbol.iterator`方法）

- 解构赋值
- 扩展运算符
- yield
- 其他：任何接受数组作为参数的场合，其实都调用了遍历器接口
  - for...of
  - Array.from()
  - Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
  - Promise.all()
  - Promise.race()

### 字符串是一个类似数组的对象，也原生具有 Iterator 接口

### Iterator 接口与 Generator 函数 ??

### 遍历器函数最终返回的遍历器对象，除了有 next 方法，还可以具有`return`方法和`throw`方法

return 场景：如果`for...of`循环提前退出（通常是因为出错，或者有`break`语句），就会调用`return`方法。如果一个对象在完成遍历前，需要清理或释放资源，就可以部署`return`方法

```JS
function readLinesSync(file) {
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return { done: false };
        },
        return() {
          file.close();
          return { done: true };
        }
      };
    },
  };
}

触发return:
// 情况一:输出文件的第一行以后，就会执行return方法，关闭这个文件
for (let line of readLinesSync(fileName)) {
  console.log(line);
  break;
}

// 情况二:在执行return方法关闭文件之后，再抛出错误
for (let line of readLinesSync(fileName)) {
  console.log(line);
  throw new Error();
}
```

### for - of

再重复一遍：只要数组结构部署了 Symbol.iterator 属性，就是部署了 iterator 接口，就可以用 for of 来遍历。其本质就是调用内部的[Symbol.iterator]指向的函数（叫遍历器函数），返回遍历器对象（此对象里有个next方法）

- for(let item of arr)  可以与`break`、`continue`和`return`配合使用

- arr.forEach(function(item,i){ })  无法中途跳出`forEach`循环，`break`命令或`return`命令都不能奏效。

- for - in

  本质：只能遍历key

  ```JS
  var arr = ['a', 'b', 'c', 'd'];
  
  for (let a in arr) {
    console.log(a); // 0 1 2 3
  }
  
  for (let a of arr) {
    console.log(a); // a b c d
  }
  ```

- 如果你非要用 for-of 来遍历对象，可以

  ```JS
  法一：和 Object.keys()或Object.entries()配合使用
  const obj = { foo: 'bar', baz: 42 };
  Object.entries(obj)
  // [ ["foo", "bar"], ["baz", 42] ]
  
  
  法二：使用 Generator 函数将对象重新包装一下
  function* entries(obj) {
    for (let key of Object.keys(obj)) {
      yield [key, obj[key]];
    }
  }
  
  for (let [key, value] of entries(obj)) {
    console.log(key, '->', value);
  }
  // a -> 1
  // b -> 2
  // c -> 3
  
  ------------------------------------------------
  
  
  // for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。
  let arr = [3, 5, 7];
  arr.foo = 'hello';
  
  for (let i in arr) {
    console.log(i); // "0", "1", "2", "foo"
  }
  
  for (let i of arr) {
    console.log(i); //  "3", "5", "7"(3所有数字索引0，5具有数字索引1……所以这些属性会被返回，但foo没有数字索引)
  }
  ```

### 计算生成的数据结构

有些数据结构是在现有数据结构的基础上，计算生成的。如ES6 的数组、Set、Map 都部署了以下三个方法

调用后都返回遍历器对象。

- entries()
- values()
- keys()

### 类数组的本质特征是有length属性