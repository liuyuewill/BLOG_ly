### 终端操作命令

- ls -a    进入一个文件后，ls 列出当前目录下的所有文件, 想看隐藏的文件（一般以.开头命名的文件），就加上 -a
- pwd ( print work directory)
- cd (change directory)
- touch ly.js 创建1个文件，名叫 ly.js
- mkdir ly 创建一个名叫 ly 的文件夹
- cat ly.js 查看ly.js文件
- vim 打开一个编辑器,  vim ly.js 用vim编辑器打开ly.js文件
  - 按i, 进入编辑模式 （输入内容、修改内容）
  - 按ESC，进入命令模式（可以用命令操作ly.js里的内容, 如dd 是删除本行）
  - 按shift+:，进入底行模式，输入 wq(或简写x)，即保存退出，或 q 直接退出

- rm -r ly.js 删除ly.js文件

### shell

- shell 外壳可以有多种壳子，如 bash、zash.
- shell 环境怎么找命令？  用 which + 命令，如 which node
- / 指根 root，不再有上一层
- ~ 指 home.  如当前电脑有三个账号 ly / zx/ admin，你用 ly 登录，~ 指 ly





### 想看自己有没有全局安装过某个包

- 如 tsc --version，如果能有结果，就说明全局安装过
- 如果你想看用 npm 安装的所有包：npm list --depth=0

