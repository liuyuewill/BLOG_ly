#### [指导文章](https://www.taniarascia.com/getting-started-with-react/)
### 基础
- Facebook 弄了一个create react app, 脚手架
- Node版本>=5.2

    npx create-react-app react-tutorial
    cd react-tutorial
    npm start

- 浏览器插件：React Developer Tools
### JSX: JavaScript + XML
一段JSX：

      const heading = <h1 className="site-heading">Hello，React</h1>



      实质上：它是执行createElement，Non-JSX写法如下：
      const heading = React.createElement(
        'h1', 
        { className: 'site-heading' }, 
        'Hello, React!'
      )
注意
- 是className，而不是class
- JSX中属性和方法的命名，都是驼峰格式，是onClick,而不是on-click
- 自结束标签，末尾必须带/，如img/, 而不像在html中img就可以了
- JSX中可以混入JS，但要带｛｝

      const name = 'Tania'
      const heading = <h1>Hello, {name}</h1>
