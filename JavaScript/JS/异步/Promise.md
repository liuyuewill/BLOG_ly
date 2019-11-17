### Promise.all([p1, p2])

只有 p1, p2 的状态均为 fullfilled, 才会调用之后的 then 里的回调，

只要任意一个小 p 的状态是 rejected，就会调用 catch 里的回调（前提是小 p 里没有自己的回调，如果小 p 有自己的catch ，因为 catch 自己也会返回一个全新的 Promise实例，所以就不会调用 Promise.all 的 catch ）

### 实现一个简单的 Promise
```JS
function Promise(fn) {
    this.status = 'pending'
    this.resolves = []
    fn(this.resolve.bind(this))
}
Promise.prototype.then = function(fn){
    this.resolves.push(fn)
    return this
}
Promise.prototype.resolve = function(){
    this.status = 'fullfiled'
    if(!this.resolves.length) return
    for (let fn of this.resolves) {
        fn()
    }
    this.resolves = []
    return this
}
```