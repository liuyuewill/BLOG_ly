- reaction(fn1数据函数, fn2效果函数)， f1 的返回值，是 f2 的参数
- reaction 返回一个清理函数
- 创建时 f2 不会立即执行（而autorun 是立即执行），只有当 f1 首次返回一个新值后，f2 才会执行
- 对于如何追踪 observable 赋予了更细粒度的控制
- f2 ( f1的返回值，reaction) 有两个参数。当调用 `reaction` 时，第二个参数会作为清理函数使用
  - 粗略地讲，reaction 是语法糖 （可查文档具体看是谁的语法糖）

```JS
const todos = observable([
    {
        title: "Make coffee",
        done: true,
    },
    {
        title: "Find biscuit",
        done: false
    }
]);

// reaction 的错误用法: 对 length 的变化作出反应, 而不是 title 的变化!
const reaction1 = reaction(
    () => todos.length,
    length => console.log("reaction 1:", todos.map(todo => todo.title).join(", "))
);

// reaction 的正确用法: 对 length 和 title 的变化作出反应
const reaction2 = reaction(
    () => todos.map(todo => todo.title),
    titles => console.log("reaction 2:", titles.join(", "))
);

// autorun 对它函数中使用的任何东西作出反应
const autorun1 = autorun(
    () => console.log("autorun 1:", todos.map(todo => todo.title).join(", "))
);

todos.push({ title: "explain reactions", done: false });
// 输出:
// reaction 1: Make coffee, find biscuit, explain reactions
// reaction 2: Make coffee, find biscuit, explain reactions
// autorun 1: Make coffee, find biscuit, explain reactions
```

f2第二个参数的用法

```JS
const counter = observable({ count: 0 });

// 只调用一次并清理掉 reaction : 对 observable 值作出反应。
const reaction3 = reaction(
    () => counter.count,
    (count, reaction) => {
        console.log("reaction 3: invoked. counter.count = " + count);
        reaction.dispose();
    }
);

counter.count = 1;
// 输出:
// reaction 3: invoked. counter.count = 1

counter.count = 2;
// 输出:
// (There are no logging, because of reaction disposed. But, counter continue reaction)

console.log(counter.count);
// 输出:
// 2
```

