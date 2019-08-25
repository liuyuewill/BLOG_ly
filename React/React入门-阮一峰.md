1. `<script type="text/babel">`，因为React独有的JSX语法，与JS不兼容，凡是有JSX的地方，都要加上“text/babel”
2. JSX 的基本语法规则
- 遇到html标签，就以HTML规则解析，遇到代码块，就以JS规则解析
3. 组件
- 名只能大写开头
- 组件内只能包含一个顶层标签，否则会报错
- 添加组件属性，需注意：class->className   for->htmlFor，因为class和for都是js的保留字
4. this.props
- this.props 对象的属性与组件的属性一一对应
- 只有一个例外，this.props.children属性，它表示组件的所有子节点
```js
this.props.children的值有三种可能：
 - 当前组件无子节点：值为undefined
 - 有一个子节点：数据类型为object
 - 有多个子节点：数据类型为array

 // React.Children是React提供的一个工具方法，专门处理this.props.children
 // 就不用再担心this.props.children的数据类型
 React.Children.map(this.props.children, (child) => {
     return <li>{child}</li>
 })
```
5. propTypes
```js
var MyTitle = React.createClass({
  propTypes: { // 用来验证组件实例的属性是否符合要求
    title: React.PropTypes.string.isRequired,
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});
```

getDefaultProps 方法可以用来设置组件属性的默认值
```js
var MyTitle = React.createClass({
  getDefaultProps : function () {
    return {
      title : 'Hello World'
    };
  },

  render: function() {
     return <h1> {this.props.title} </h1>;
   }
});

ReactDOM.render(
  <MyTitle />,
  document.body
);
```
6. 获取真实的DOM节点，ref属性
```js
var MyComponent = React.createClass({
  handleClick: function() {
    this.refs.myTextInput.focus(); // 重点
  },
  render: function() {
    return (
      <div>
        <input type="text" ref="myTextInput" /> 
        <input type="button" value="Focus the text input" onClick={this.handleClick} />
      </div>
    );
  }
});

ReactDOM.render(
  <MyComponent />,
  document.getElementById('example')
);

如果想要拿到用户的输入内容，就必须获取真实的DOM节点，虚拟dom是拿不到用户输入的。
，所以必须用ref属性，this.refs[refName],才能返回这个真实的DOM节点。

因为要获取真实的DOM，所以必须等虚拟DOM插入文档以后，才能使用ref，不然会报错
```
7. this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。
8. Ajax
   在componentDidMount里进行ajax请求，成功之后，再用this.setState方法重新渲染UI