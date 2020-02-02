### strictNullChecks

```JS
即 null 和 undefined 只能赋值给 any 和它们各自。
(一个例外是 undefined 是也可以分配给void)

let a:any = undefined/null

let a:undefined = undefined
let a:null = null

let b:void = undifined
```

### target： 指定编译后形成哪种版本的js

### lib：指定编译过程中需要哪些辅助库

比如如果不指定使用ESNext编译辅助库，bigInt就无法使用

### 启动装饰器 "experimentalDecorators": true

