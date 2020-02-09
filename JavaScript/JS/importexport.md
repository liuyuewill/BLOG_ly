模块加载方案

- 运行时确定

    - CommonJS：用于服务器。CommonJS 模块输出的是值的缓存，不存在动态更新
    -  AMD：用于浏览器

- 编译时确定

    - ES6 模块化：很优秀，完全可以取代前两种

        - export 出去的值，可被动态更新

            ```JS
            // 法一 profile.js 
            export var firstName = 'Michael';
            export var lastName = 'Jackson';
            export var year = 1958;
            export function multiply(x, y) {
              return x * y;
            };
            
            
            // 法二 profile.js
            var firstName = 'Michael';
            var lastName = 'Jackson';
            var year = 1958;
            function v1() { ... }
            function v2() { ... }
            
            export { 
            	firstName, 
                lastName, 
                year， 
                v1 as streamV1,
                v2 as streamV2, 
            };               
            ```

            ```JS
            // 报错
            export 1; // 1 只是一个值，不是接口
            // 报错
            var m = 1;
            export m; //  1 只是一个值，不是接口
            ```

            

        - import

            - import 命令输入的变量都是【只读】的，因为它的本质是输入接口
            - import 命令具有提升效果，会提升到整个模块的头部，首先执行
            - import 语句会执行所加载的模块
            - 模块的整体加载

            ```js
            // 以上两种 export 导出方法，对应的 import
            法一： import {firstName, streamV1} from './profile.js'
            法二： import * as objOne from './profile.js' // 叫 模块的整体加载   
                
            // 只读
            import {a} from './xxx.js'
            a = {}; // Syntax Error : 'a' is read-only;
            a.foo = 'hello'; // 如果 a 是一个对象，就是合法操作
            
            // 不带路径时，执行加载的模块
            import 'lodash';
            ```

        - export default

            ```JS
            // demo 1
            export default function () {// export-default.js
              console.log('foo');
            }
            
            import customName from './export-default'; // 这时import命令后面，不使用大括号。
            customName(); // 'foo'
            
            
            // demo2
            export default class { ... }// MyClass.js
            
            import MyClass from 'MyClass';
            let o = new MyClass();
            
            // demo3
            如果想在一条 import 语句中，同时输入 默认方法 和 其他接口
            import _, {each, forEach} from 'lodash'
            ```

            ```JS
            // 解释
            export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字
            
            export var a = 1;// 正确
            
            var a = 1;
            export default a; // 正确。 将变量a的值赋给变量default
            
            export default var a = 1; // 错误
            ```

        - export 与 import 的复合写法 

            ```JS
            // demo1
            export { foo, bar } from 'my_module';
            // 可以简单理解为
            import { foo, bar } from 'my_module';
            export { foo, bar };
            
            // demo2 整体输出
            export * from 'circle';
            // export *，表示再输出 circle 模块的所有属性和方法。注意，export * 命令会忽略 circle 模块的 default 方法
            
            // demo3
            export { es6 as default } from './someModule';
            // 等同于
            import { es6 } from './someModule';
            export default es6;
            ```

        - `import()动态按需加载：类似于 Node 的`require`方法，区别主要是前者是异步加载，后者是同步加载。

            



