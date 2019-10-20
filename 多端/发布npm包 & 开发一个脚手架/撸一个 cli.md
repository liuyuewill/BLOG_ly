### 脚手架是怎样工作的

1. 用户输入，例如用 vue-cli 的时候，它会“问”你很多配置选项
2. 生成配置文件
3. 生成项目结构，这是候可能会使用一个项目模版
4. 安装依赖

### 开发自己的脚手架

（源码已经放在github上了）

全局安装一个包 npm i ly-cli-test -g

然后你就可以愉块地用 ly 这个命令来生成一个项目了

```js
ly init blog a-blog-from-template-blog    // ly init <template-name> <project-name>
```

