### Set 和 Map 数据结构
### Set
似于数组，但是成员的值都是唯一的，没有重复的值

Set本身是一个构造函数，用来生成 Set 数据结构
      
    const s = new Set();
    [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x)); // add方法

    for (let i of s) {
      console.log(i);
    }
    // 2 3 5 4

### Set函数的参数
- 数组

      // 例一
      const set = new Set([1, 2, 3, 4, 4]);
      [...set]  // [1, 2, 3, 4]


      // 例二
      const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
      items.size // 5
- 去除重复

      // 去除数组的重复成员
      法一：[...new Set(array)] 
      法二：Array.from(new Set(array))

      //去除字符串里面的重复字符
      [...new Set('ababbc')].join('')
      // "abc"

### Set实例的属性和方法
- add

      let set = new Set();
      let a = NaN;
      let b = NaN;
      set.add(a);
      set.add(b);
      set // Set {NaN}

      NaN等于自身，5和‘5’不一样
- 属性
  - Set.prototype.constructor：构造函数，默认就是Set函数。
  - Set.prototype.size：返回Set实例的成员总数。
- 操作方法
  - Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
  - Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
  - Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
  - Set.prototype.clear()：清除所有成员，没有返回值。
- 遍历方法
>Set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

>由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致
  - Set.prototype.keys()：返回键名的遍历器
  - Set.prototype.values()：返回键值的遍历器
  - Set.prototype.entries()：返回键值对的遍历器
  - Set.prototype.forEach()：使用回调函数遍历每个成员

### 直接用for-of遍历Set实例：
    let set = new Set(['red', 'green', 'blue']);
    for (let x of set) {
      console.log(x);
    }
    // red
    // green
    // blue
### forEach()
### Array.from()可将类数组转为真数组
    Array.from(new Set([1, 2, 3, 4, 5]));
