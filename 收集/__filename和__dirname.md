_filename:返回当前模块文件被解析过后的绝对路径，该属性并非全局，而是模块作用域下的

_dirname:返回当前模块文件解析过后所在的文件夹(目录)的绝对路径，该属性也不是全局的，而是模块作用域下的

```JS
-dir
 -app.js

__dirname为 F：\dir 是app.js所在的目录的绝对路径 
__filename为 F：\dir\app.js 文件本身的绝对路径
```

