### module的加载实现
#### es6模块与commonJs模块的差异

- CommonJS 模块输出的是一个值的拷贝
      一旦输出一个值，模块内的变化影响不影响外面对它的引用（？？不是很明白）
- ES6 模块输出的是值的引用
       JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个【只读引用】。等到脚本真正执行时，再根据这个只读引用，到【被加载的那个模块里面去取值】
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- 需求用node命令去执行的文件，里面肯定要用Node的语法呀，得用require、module.exports

#### 循环加载那块没看明白