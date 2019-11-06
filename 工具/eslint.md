### ESlint
- 它是做什么的？ 专门审查 js 代码的，es 即为 ECMAScript
  - 格式化代码，如，配置了缩进 4，你代码里却是 2
  - 审查 JS 代码，如，提示语法错误

- 怎么做？
  - 首先需要你安装一个 eslint 的插件
  - 然后再在你的项目根目录下配置 eslint 文件。不安插件，或不配置文件，均不起作用
  - 想要 保存 时自动用 ESlint 检测代码：在 setting 文件里配置 "eslint.autoFixOnSave": true

### Prettier
- 做什么的？
  - 只！！！格式化代码（它有默认的一些格式，可用 option+ shift + f , 你也可以写配置文件）
  - 并不审查语法（与eslint的区别）

### 你同时用了 eslint 和 prettier
极可能格式冲突

