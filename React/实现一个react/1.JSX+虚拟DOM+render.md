### 关于JSX
    const title = <h1 className="title">Hello, world!</h1>;

本质上，jsx是语法糖，上面这段代码会被babel转换成如下代码：

    const title = React.createElement(
        'h1',
        { className: 'title' },
        'Hello, world!'
    );
### React.createElement和虚拟DOM

- 实现一个React.createElement

      function createElement (title, props, ...children) {
        return {
          tag,
          props,
          children
        }
      }

      const React = {
        createElement
      }

      const element = (
        <div>
            hello<span>world!</span>
        </div>
      )
      console.log( element );

      createElement方法返回的对象，记录了这个DOM节点所有的信息，
      换言之，通过它我们就可以生成真正的DOM，这个记录信息的对象我们称之为虚拟DOM
### ReactDOM.render

    ReactDOM.render(
      <h1>Hello, world!</h1>,
      document.getElementById('root')
    );

    经过转换，这段代码变成了这样
    ReactDOM.render(
        React.createElement( 'h1', null, 'Hello, world!' ),
        document.getElementById('root')
    );
    总结：
    - render的第一个参数是createElement返回的值，即虚拟DOM
    - 第二个参数是挂载目标的DOM
    总之，render函数就是把虚拟DOM转成真实DOM




    render的实现：
    function render( vnode, container ) {
      // 当vnode为字符串时，渲染结果是一段文本
      if ( typeof vnode === 'string' ) {
          const textNode = document.createTextNode( vnode );
          return container.appendChild( textNode );
      }

      const dom = document.createElement( vnode.tag );

      if ( vnode.attrs ) {
          Object.keys( vnode.attrs ).forEach( key => {
              const value = vnode.attrs[ key ];
              setAttribute( dom, key, value );    // 设置属性
          } );
      }

      vnode.children.forEach( child => render( child, dom ) );    // 递归渲染子节点
      return container.appendChild( dom );    // 将渲染结果挂载到真正的DOM上
    }
