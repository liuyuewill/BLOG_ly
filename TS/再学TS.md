

- TypeScript的原始类型包括: boolean、number、string、void、undefined、null、symbol、bigint。

- 枚举

    ```JS
    // 数字枚举
    enum Direction {
        Up, // 默认从0开始依次累加
        Down,
        Left,
        Right
    }
    
    enum Direction {
        Up = 10,
        Down,
        Left,
        Right
    }
    console.log(Direction[10], Direction['Right']); // Up 13
    
    // 字符串枚举
    enum Direction {
        Up = 'Up',
        Down = 'Down',
        Left = 'Left',
        Right = 'Right'
    }
    
    // 常量枚举
    const enum Direction {
        Up = 'Up',
        Down = 'Down',
        Left = 'Left',
        Right = 'Right'
    }
    
    const a = Direction.Up;
    ```

- 接口

    - 普通接口 interface
    - class也可当接口用

    ```JS
    // 普通接口
    {
        name: 'xiaoming',
        age: 16,
        isMale: true,
        say: Function,
        phone: {
            NetEase: 'xiaoming@163.com',
            qq: '784536325@qq.com',
            sina: 'abc784536325@sina.com',
        }
    }
      
    接口怎么写？
    interface Person {
      name: string;
      age: number;
      isMale: boolean;
      say: () => string;
      phone: Phone;
    }
    interface Phone {
      [name:string]: string;
    }
      
      
    // 接口继承
    interface VIPUser extends User, SupperUser {
        broadcast: () => void
    }
    ```

- 类

    - public: 默认对外开放

    - private: 只能自身用
    - protected: 自己 和 子类 可用，实例不可用
    - 类可以当作 接口 来使用

- 函数

    ```JS
    // 如何显示地定义一个函数类型
    const add: (a:number, b:number) => number = (a:number, b:number) => a+b
    
    括号里的 (a: number, b: number) 为参数类型,而通过 => 来连接参数与返回值, 最后则是返回值的类型。
    
    // 默认值
    // 重点：带默认初始值的参数，都是可选参数。此默认参数的类型就是，默认值的类型
    // 普通的可选参数，必须放在最后面，但带有初始值，虽然也是可选参数，但可放任意位置
    function buildName(firstName: string, lastName = "Smith") {
        return firstName + " " + lastName;
    }
    ```

    

