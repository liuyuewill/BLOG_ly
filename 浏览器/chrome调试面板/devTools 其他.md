## 1. 直接访问 dom 元素两种方法

- 在元素面板选择一个元素,然后在控制台输入 `$0`,就会在控制台中得到刚才选中的元素。如果页面中已经包含了 jQuery,你也可以使用 `$($0)`来进行选择

    ```JS
    然后你就可以操作：
    $0.click()
    $0.hover()
    
    控制台会存储最近 5 个被选择的元素和对象。所以当前是 $0, 上一个是 $1
    ```

    

- 在控制台输出的 DOM 元素上右键选择 Reveal in Elements Panel 来直接在 DOM 树中查看

## 2. 访问最近的控制台结果 $_

## 3. 用 console.table 代替 console.log

## 4. copy

通过 copy 方法在控制台里复制你想要的东西

```JS
如，你输入了 location,然后得到一个结果。
你再 copy($_) 就可以复制得到你刚刚的结果
```



## 5. 耗时监控 console.time()/ console.timeEnd()

## 6. 清空控制台历史记录

- Cmd + k
- clear()

## 7. degubber;

## 8. 切换主题

- Cmd + shift +p，输入 theme

## 9. 重写 Overrides

调试 css 或 JavaScript 时，想把修改的值保存下来,刷新页面的时候不会被重置

打开 Chrome DevTools 的 Sources 标签页
选择 Overrides 子标签
选择 + Select folder for overrides,来为 Overrides 设置一个保存重写属性的目录



## 10. 实时表达式 Live Expression

点击 "Create Live Expression" 眼睛图标,打开动态表达式界面,输入要监控的表达式

## 11. 滚动到视图区域 Scroll into view

## 12.

上一次： cmd + options + i

Console 面板： cmd + options + j

