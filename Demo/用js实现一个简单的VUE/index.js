
class lyVue {
    constructor(options) {
        this.$el = document.querySelector(options.el)
        let data = options.data
        this.data = data
        this.methods = options.methods
        // prop进行代理
        Object.keys(data).forEach((prop) => {
            this.proxyKey(prop)
        })
        this.watcherTask = {}
        this.observer(data)
        this.compile(this.$el)
    }
    proxyKey(prop) {
        let self = this
        Object.defineProperty(self, prop, {
            get(){
                return self.data[prop]
            },
            set(val){
                if(val !== data[prop]){
                    self.data[prop] = val
                }
            }
        })
    }
    observer(data) {
        let self = this
        Object.keys(data).forEach((prop) => {
            let value = data[prop]
            this.watcherTask[prop] = []
            Object.defineProperty(data, prop, {
                get(){
                    return value
                },
                set(val){
                    if(val !== value){
                        self.data[prop] = val
                        this.watcherTask[prop].forEach((item) => {
                            item.update()
                        })
                    }
                }
            })
        })
    }
    compile(el) {
        let self = this
        let nodes = el.childNodes
        for(let i = 0; i < nodes.length; i++) {
            let node = nodes[i]
            if (node.nodeType === 3) { // 文本节点
                if (!node.textContent.trim()) continue
                self.txtCompile(node, 'textContent')
            } else {
                if(node.nodeType === 1) { // 元素节点

                }
            }
        }
    }
    txtCompile(node, type) {
        let self = this
        let txt = node[type].trim()
        let reg = /\{\{(.*?)\}\}/g
        if(reg.test(txt)) {
            node[type] = txt.replace(reg, function(match, prop){
                let wlist = self.watcherTask[prop] || []
                wlist.push(new Watcher(node, self, prop, type))
                // 处理prop可能是ly.name这样的值
                let arr= prop.split('.')
                if (arr.length>1) {
                    let val = null
                    for(let ele of arr){
                        val = val ? val[ele] : self[ele]
                    }
                    return val
                } else {
                    return self[prop]
                }
            })
        }
    }
}

class Watcher{
    constructor(node, vm, prop, type){
        this.node = node
        this.vm = vm
        this.prop = prop
        this.type = type
        this.update()
    }
    update() {
        this.node[this.type] = this.vm[this.prop]
    }
}