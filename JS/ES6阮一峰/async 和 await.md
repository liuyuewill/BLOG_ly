### Q: async函数返回什么
#### A：一个 Promise 对象。

async 函数 return 出的值，会成为 then 的参数

async 函数内抛出错，会导致返回的 Promise 对象变为reject状态

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