### npm

- 它是一个包管理工具，你可以用npm增、删、改、查 包

### package

有两个重要属性

- **scope作用域**

  一旦注册，就会获得一个scope，用这个scope作为包的命名空间，例如@yuyy、@58。防止与他人的包名冲突

- ##### **Accessibility**（可访问性）

  属性值为

  - private：私有，仅作者本人或团队成员可见
  - public：公有，所有人可见

### modules 

下载到本地时，包都会放在 node_modules 里

- 如果包里有可用命令的话，package.json里要有bin字段
- 如果要能被import出来使用，package.json里要有main字段

### 发npm包步骤

1. 注册 npm 账号
2. 全局安装nrm：管理npm仓库的软件，可快速切换npm仓库

```
nrm //展示nrm可用命令
 nrm ls //列出已经配置的所有仓库
 nrm test //测试所有仓库的响应时间
 nrm add <registry> <url> //新增仓库
 nrm use <registry> //切换仓库
```

3. npm init，再写好package.json,写main   bin字段
4. npm publish
5. 在某个项目里安装这个包：npm i liuyuewill-test-npm

注意：在Node环境中是通过CommonJS的风格管理模块的

### 包迭代

- 内容更新

- 版本号更新: **npm采用[语义化版本](https://docs.npmjs.com/about-semantic-versioning)，共三位，以’.’隔开，从左至右依次代表：主版本（major）、次要版本（minor）、补丁版本（patch）。**

  ```js
  major.minor.patch
  1.1.0
  
  变更版本号的命令：npm version <major | minor | patch>
  ```

- 你再去项目里更新这个包

  ```JS
  npm up liuyuewill-test-npm
  ```

  

- 通过命令查看所有包的版本

  ```
  npm view liuyuewill-test-npm versions
  ```

### 其他

```JS
每个命令对应的文件都需要以  #!/usr/bin/env node  开头
它的意思是：告诉操作系统要以node环境来执行当前这个文件

我们在执行某个文件时会这样：  ./node_modules/bin/md5 liuyue
./node_modules/bin/md5的意思就是打开 ./node_modules/bin/md5这个路径的文件，并且我们传入参数liuyue，所以
./node_modules/bin/md5 liuyue 就会在node环境中下，带着参执行这个文件


命令行窗口是一个：你输入命令，和操作系统进行交互的地方
```

