### Q: async函数返回什么
#### A：一个 Promise 对象。

async 函数 return 出的值，会成为 then 的参数

async 函数内抛出错，会导致返回的 Promise 对象变为 reject 状态

    async function f() {
      throw new Error('出错了');
    }
    
    f().then(
      v => console.log(v),
      e => console.log(e)
    )
    // Error: 出错了

```JS
async 函数内部在执行时，遇到 await 就会先执行完此异步函数，执行完之后再往下继续执行。例子：
async function getStockPriceByName(name) {
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
  console.log(result);
});
```



### Q：await命令返回什么

#### A：await 后面跟的 promise 对象 resolve 出来的值

await命令后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值。
    
    即：
    await + promise对象 得到的值 是promise 对象 resolve出的东西
### Q：如果有一个 await 后的 Promise 最终状态是 rejected，会发生什么
整个 async 函数都会停止执行。
那如果想要： 第一个异步就算失败，也希望后面的异步继续执行，怎么办
- 法一：用 try {...} catch (e) {...}
- 法二：await 后面的 Promise 自己就要带上 catch
```JS
// 法一：
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 法二：

async function myFunction() {
  await somethingThatReturnsAPromise()
  .catch(function (err) {
    console.log(err);
  });
}
```

### Q：await 明显是前一个执行完，再执行下面的，但如果想并发怎么办？

```JS
let foo = await getFoo();
let bar = await getBar();

--------------------------

想让 foo 、 bar 并发；
let [foo, bar] = await Promise([getFoo(), getBar() ])
```

### Q：感受几个例子

```JS
例1：
async function chainAnimationsAsync(elem, animations) {
  let ret = null;
  try {
    for(let anim of animations) { // 继发
      ret = await anim(elem);
    }
  } catch(e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}




例2：
async function logInOrder(urls) {
  // 并发读取远程URL
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}
虽然map方法的参数是async函数，但它是并发执行的，因为只有async函数内部是继发执行，外部不受影响。后面的for..of循环内部使用了await，因此实现了按顺序输出。
```

### Q：async/await 和 Promise 的联系 + 区别

- async/await 是基于 Promise 的

- async/await 看起来更像是同步代码

- async/await 和 Promise 都不阻塞

- 区别：

  ```JS
  async 写在函数开头，函数内使用 await；
  async 函数总会返回一个 Promise 对象;
  async 函数return 出的值，会成为 then 回调的参数。
  
  以上特性，决定了 async/await:
  - 代码更简洁，不用再手写 then
  - 错误处理：
  	Promose 内发生的错误，只能用 catch 捕捉(当然了，最外层也是可以用 try-catch 的)，而 async/await 可以    	像处理同步代码错误那样用 try-catch
  - 如果有继发需求，async/await 会更简洁
  ```

- 小结：

  ![image-20191004233025176](/Users/liuyue/Library/Application Support/typora-user-images/image-20191004233025176.png)

### async/awati 要配套使用

```JS
经常会出现这种写法：
(async () => {
  // do your async work
})()
```

