## vue

- nextTick： 在下次 DOM 更新循环结束之后执行延迟回调，可用于获取更新后的dom状态
  - 默认使用 mincrotasks, v-on 使用 macrotasks
  - macrotasks：
    - setImmediate / MessageChannel / setTimeout 
- 生命周期
  - \_init_  
    - initLifecycle/Event， 往vm上挂载各种属性
    - callHook: beforeCreated: 实例刚创建
    - initInjection/initState: 初始化注入和data响应性
    - created: 创建完成，属性已经绑定， 但还未生成真实dom
    - 进行元素的挂载： $el / vm.$mount()
    - 是否有template: 解析成 render function
      - .vue： vue-loader 会将 template 编译成 render 
    - beforeMount： 模板编译/挂载之前
    - 执行 render，生成真实的 DOM， 并替换到DOM Tree中
    - mounted: 组件已挂载
  - update:
    - re-vdom diff 
    - flushScheduleQueue
      - watcher.befort:  beforeUpdate 组件更新			- watcher.run(): watcher触发更新
    - updated：组件已更新
  - actived / deactivated(keep-alive)： 不销毁，缓存，组件激活与失活
  - destroy:
    - beforeDestroy： 销毁开始
    - 销毁自身且递归销毁子组件以及事件监听
      - remove(): 删除节点
      - watcher.teardown()： 删除依赖
      - vm.$off()： 删除监听
    - destroyed：完成后触发

```js
new Vue({})
// 初始化Vue实例
function _init() {
    initLifeCycle(vm) // 挂载属性
    initEvent(vm) // 初始化事件系统，钩子函数等
    initRender(vm) // slot 、 vnode 
    callHook(vm, 'beforeCreate')
    initInjection(vm) // inject
    initState(vm) // 数据响应 props/data/watch/computed/methods
    initProvide(vm) // provide
    callHook(vm, 'created')

    if (vm.$options.el) {
        vm.$mount(vm.$options.el)
    }
}
// 挂载节点
function mountComponent(vm) {
    if (!this.options.render) {
        // template to render
        // Vue.compile = compileToFunctions
        let { render } = compileToFunctions() 
        this.options.render = render
    }
    callHook('beforeMounte')
    // 初始化观察者
    vm._update(vm.render())  // render 渲染vdom， update: 挂载成真实的dom， patchs
    callHook(vm, 'mounted')
}
// 更新节点
funtion queueWatcher(watcher) {
	nextTick(flushScheduleQueue)
}

function flushScheduleQueue() {
    for(){
        watcher.before() // beforeUpdate
        watcher.update() // 依赖局部更新节点
        callHook('updated')
    }
}
// 销毁实例
Vue.prototype.$destory = function() {
    callHook(vm, 'beforeDestory')
    remove() // 自身及子节点
    watcher.teardown() // 删除依赖
    vm.$off() // 删除监听
    callHook(vm, 'destoryed')
}
```

- 数据响应
  - initProps / initState
  - Observe(观察者) --> for --> defineReactive(包含Dep)
  - get(收集依赖)
    - Dep.depend() --> watcher.addDep()
  - set(派发更新)
    - Dep.notify() --> watcher.update() --> queenWatcher() --> nextTick --> flushScheduleQueue --> watcher.run() --> updateComponent()

```js
let data = {a: 1}
// 数据响应性
observe(data)
// 初始化观察者
new Watcher(data, 'name', updateComponent)
data.a = 2

function updateComponent() {
    vm._update() // patchs
}

function observe(obj) {
    Object.keys(obj).map(key => {
        defineReactive(obj, key, obj[key])
    })
}

function defineReactive(obj, k, v) {
    // 递归子属性
    if (type(v) == 'object') observe(v)
    
    let dep = new Dep()
    Object.defineProperty(obj, k, {
        enumerable: true,
        configurable: true,
        get: function reactiveGetter() {
            if (Dep.target) {
                dep.addSub(Dep.target)
            }
            return v
        },
        set: function reactiveSetter(nV) {
            v = nV
            dep.nofify()
        },
    })
}

class Dep {
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    notify() {
        this.subs.map(sub => {
            sub.update()
        })
    }
}

Dep.target = null

class Watcher {
    constructor(obj, key, cb) {
        Dep.target = this
        this.cb = cb
        this.obj = obj
        this.key = key
        this.value = obj[key]
        Dep.target = null
    }
    addDep(Dep) {
        Dep.addSub(this)
    }
    update() {
        this.value = this.obj[this.key]
        this.cb(this.value)
    }
    before() {
        callHook('beforeUpdate')
    }
}

接口请求发生在哪个生命周期：
1、在created的时候，视图中的html并没有渲染出来，所以此时如果直接去操作html的dom节点，一定找不到相关的元素

2、而在mounted中，由于此时html已经渲染出来了，所以可以直接操作dom节点，（此时document.getelementById 即可生效了）。
```

- Proxy
  - 数组变化也能监听到
  - 不需要深度遍历监听

```js
let data = { a: 1 }
let reactiveData = new Proxy(data, {
	get: function(target, name){
	
	}
})
```

- virtual Dom 
  - 创建 dom 树 
  - 树的diff， 同层对比 ，输出 patchs (listDiff/diffChildren/diffProps)
    - 没有新的节点，返回
    - 新的节点 tagName 与 key 不变， 对比 props， 继续递归遍历子树
      - 对比属性(对比新旧属性列表):
        - 旧属性是否存在与新属性列表中
        - 都存在的是否有变化
        - 是否出现旧列表中没有的新属性
    - tagName 和 key 值变化了，则直接替换成新节点
  - 渲染差异
    - 遍历 patchs， 把需要更改的节点取出来
    - 局部更新 dom

```js
function diff(oldTree, newTree) {
    let pathchs = {}
    dfs(oldTree, newTree, 0, pathchs)
    return pathchs
}

function dfs(oldNode, newNode, index, pathchs) {
    let curPathchs = []
    if (newNode) {
        // tagName key
        if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {
            let props = diffProps(oldNode.props, newNode.props)
            curPathchs.push({ type: 'changeProps', props })
            diffChildrens(oldNode.children, newNode.children, index, pathchs)
        } else {
            curPathchs.push({ type: 'replaceNode', node: newNode })
        }
    }

    if (curPathchs.length) {
    		if(pathchs[index]){
    			pathchs[index] = pathchs[index].concat(curPathchs)
    		} else {
    			pathchs[index] = curPathchs
    		}
    }
}

function diffProps(oldProps, newProps) {
    let propsPathchs = []
    // 查找删除项
    // 查找修改项
    // 查找新增项
    forin(olaProps, (k, v) => {
        if (!newProps.hasOwnProperty(k)) {
            propsPathchs.push({ type: 'remove', prop: k })
        } else {
            if (v !== newProps[k]) {
                propsPathchs.push({ type: 'change', prop: k , value: newProps[k] })
            }
        }
    })
    forin(newProps, (k, v) => {
        if (!oldProps.hasOwnProperty(k)) {
            propsPathchs.push({ type: 'add', prop: k, value: v })
        }
    })
    return propsPathchs
}

function diffChildrens(oldChild, newChild, index, pathchs) {
		// 标记删除/新增/移动
    let { change, list } = diffList(oldChild, newChild, index, pathchs)
    if (change.length) {
        if (pathchs[index]) {
            pathchs[index] = pathchs[index].concat(change)
        } else {
            pathchs[index] = change
        }
    }

		// 递归
    // list： 都存在的节点 
    oldChild.map((item, i) => {
        let keyIndex = list.indexOf(item.key)
        if (keyIndex) {
            let node = newChild[keyIndex]
            dfs(item, node, index, pathchs)
        }
    })
}

function diffList(oldList, newList, index, pathchs) {
    let change = []
    let list = []
    const newKeys = getKey(newList)
    oldList.map(v => {
        if (newKeys.indexOf(v.key) > -1) {
            list.push(v.key)
        } else {
            list.push(null)
        }
    })

    // 标记删除
    for (let i = list.length - 1; i>= 0; i--) {
        if (!list[i]) {
            list.splice(i, 1)
            change.push({ type: 'remove', index: i })
        }
    }

    // 标记新增和移动
    newList.map((item, i) => {
        const key = item.key
        const index = list.indexOf(key)
        if (index === -1 || key == null) {
            // 新增
            change.push({ type: 'add', node: item, index: i })
            list.splice(i, 0, key)
        } else {
            // 移动
            if (index !== i) {
                change.push({
                    type: 'move',
                    form: index,
                    to: i,
                })
                move(list, index, i)
            }
        }
    })

    return { change, list }
}
```

- vue-router
  - mode 
    - hash
    - history
  - 跳转
    - this.$router.push() 
    - \<router-link to="">\</router-link>
  - 占位： \<router-view>\</router-view>
- vuex
  - state: 状态中心	 
  - mutations： 更改状态
  - actions：异步更改状态
  - getters： 获取状态
  - modules： 将 state 分成多个 modules，便于管理
## webpack

- 原理
- Loader
  - loader-utils
  - 同步与异步： return / async
  - 处理二进制： module.exports.raw = true;
  - ResolveLoader： modules: ['node_modules','./loaders/'],
- Plugin
  - 启动时初始化插件实例，进行事件的监听，传入 Compiler
  - Compiler: 包含了 Webpack 环境所有的的配置信息，代表了整个 Webpack 从启动到关闭的生命周期
  - Compilation: 包含了当前的模块资源、编译生成资源、变化的文件等，只是代表了一次新的编译