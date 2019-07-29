### 模版字符串
    // 字符串中嵌入变量
    let name = "Bob", time = "today";
    `Hello ${name}, how are you ${time}?`

    模板字符串的大括号内部，就是执行 JavaScript 代码
    `Hello ${'World'}`
    // "Hello World"

    模板字符串甚至还能嵌套。
    const tmpl = addrs => `
      <table>
      ${addrs.map(addr => `
        <tr><td>${addr.first}</td></tr>
        <tr><td>${addr.last}</td></tr>
      `).join('')}
      </table>
    `;
### 标签模版
？