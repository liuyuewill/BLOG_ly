### webpack 为什么要打包我们的代码

因为前端写的是模块化的文件，模块化有可提高开发效率、易维护、模块之间耦合低等优点。

但浏览器器无法识别我们的模块化如 .vue 代码，怎么办呢，就用一个工具 webpack 把开发代码进行打包，生成 js 代码，浏览器就可以执行了。那问题来了：webpack 怎么进行打包的呢



### 实现一个 miniwebpack

第一步：用 node 去读取要被打包的100个所有文件，通过 转化成AST / Babel 编译找出每个文件的依赖，生成一个依赖图集，然后再生成一个浏览器可执行的 bundle.js 文件（目前打包出来的文件名都叫 vendor.js 了），这个 bundle.js 是个自执行函数。



第二步：自执行函数是怎么工作的？

会把依赖图集整理成一个数组，数组里是100份文件的信息，每个 item 的形式都是函数（这里简化了，应该是个对象），数组第一项肯定是入口 entry.js 文件，它的 moduleID 是 0 。  自执行函数内部会有一个 webpack_require 函数，这个函数的参数就是参数数组里的某一项，_webpack_require_ 函数作用解释如下

```js
（function(){
  
  // _webapck_require_函数做了两件事
  // 1、定义一个模块加载函数 webpack_require。
	// 2、使用加载函数加载入口模块 “./src/index.js”。
  function _webapck_require_(moduleId) { // 专业名词：模块加载函数
    
    // entry.js（）函数会执行，并且会把 _webapck_require_ 函数传进 entry.js 函数, 当遇到 import 的时候，再 执行_webapck_require_（被import的文件的moduleId），依次执行下去，就会从 entry.js 文件开始并且执行完所有依赖文件，即 bundle.js 参数里的所有文件被执行
  }
    
  return _webapck_require_(入口文件)
}）([
  // 第 0 个，肯定是 entry.js
  function entry.js(require, ...) {
    ...
  }
  
])
```



参考：https://mp.weixin.qq.com/s/uc4fVViv4u86TTX2XsMgFA