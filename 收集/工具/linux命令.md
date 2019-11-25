终端操作命令：
- ls -a    进入一个文件后，ls 列出当前目录下的所有文件, 想看隐藏的文件（一般以.开头命名的文件），就加上 -a
- pwd( print work directory)
- cd (change directory)
- touch ly.js 创建1个文件，名叫 ly.js
- mkdir ly 创建一个名叫 ly 的文件夹
- cat ly.js 查看ly.js文件
- vim 打开一个编辑器,  vim ly.js 用vim编辑器打开ly.js文件
  - 按i, 进入编辑模式 （输入内容、修改内容）
  - 按ESC，进入命令模式（可以用命令操作ly.js里的内容）
  - 按shift+:，进入底行模式，输入 wq，即保存退出

- rm -r ly.js 删除ly.js文件

---
- 按i 可以insert一些东西
- 按esc 进入命令模式，之后可以用命令来操作刚刚insert的东西，如dd 是删除本行
- shift+:进入底行模式，可以进行退出q 或 保存退出wq,再enter就行了