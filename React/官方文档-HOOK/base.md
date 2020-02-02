### React 16.8 的新增特性。功能：

- Hook 是什么： Hook 是一个特殊的函数，它可以让你“钩入” React 的特性



### 函数组件(又叫无状态组件)

```JS
function Example(props) {
  // 你可以在这使用 Hook
  return <div />;
}
```



## React 内置的 Hook

### useState

之前学的是，只能在 class 组件里用 state，现在有新方法：

```JS
import React, {useState} from 'React' // useState 就是一个 Hook
function Example() { // 函数组件
    const [count, setCount] = useState(0)
    // 在函数组件里调用 useState, 可给当前组件添加一些内部 state。初始 state 参数只有在第一次渲染时会被用到
    return (
        <div> // 使用 state: 直接使用 {count}
          <p>You clicked {count} times </p> 
          <button onClick={() => setCount(count + 1)}>  // 更新 state
            Click me
          </button>
        </div>
      );
}

// useState 返回值

```

- 有两个返回值

    ```JS
    const [count, setCount] = useState(0) // 值1： 当前状态; 值2： 一个让你更新它的函数
    ```

- 可在一个组件中多次使用 State Hook

- state 只在组件首次渲染的时候被创建。在下一次重新渲染时，`useState` 返回给我们当前的 state



### useEffect

可在【组件渲染后】实现各种不同的副作用。有些副作用可能需要清除，所以需要返回一个函数。

- 副作用/作用：在 React 组件中执行过数据获取、订阅 或 手动修改过 DOM，这些操作就叫 xxx
- 函数组件可通过 useEffect 操作 副作用
- useEffect = componentDidMount + componentDidUpdate + componentWillUnmount
- React 组件中，两种常见副作用操作：需要清除、不需要清除

```JS
import React, {useState, useEffect} from 'React'
function Example() {
  const [count, setCount] = useState(0);

  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => { // 参数是一个 “副作用”函数
    document.title = `You clicked ${count} times`; // 可访问到组件的 props 和 state
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

// 副作用函数里：还可以通过返回一个函数来指定如何“清除”副作用
// 在 componentDidMount 中设置订阅，并在 componentWillUnmount 中清除它
useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

    return () => {
        ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
});
```

- React 何时清除 effect:  (如果 effect 是一个监听操作) React *会*在执行当前 effect 之前对上一个 effect 进行清除

- 可以在组件中多次使用 `useEffect`

    

### Hook 使用规则

- Hook 就是 js函数
- 只能在函数最外层调用 Hook，不能在循环、条件判断、子函数里调用。
- 只能在 React 函数组件里调用 Hook.