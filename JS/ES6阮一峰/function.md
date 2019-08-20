### 函数
#### 1、函数怎么传默认参

    function(x=5, y=10) 这样
    如果想跳过第一个参数，可用undefined代替，但传null不行，传null就是Null

    函数传参可以和解构赋值一起用
    function get({x,y})
    get({x: 10, y:20 })


#### 2、当默认参是一个函数，默认参会有自己的作用域

- 初始化之后，作用域就会销毁

      let foo = 'outer';
      function bar(func = () => foo) {
        let foo = 'inner';
        console.log(func());
      }
      bar(); // outer


      不明白？？？
      var x = 1;
      function foo(x, y = function() { x = 2; }) {
        var x = 3;
        y();
        console.log(x);
      }
      foo() // 3
      x // 1

- 默认函数参，在运行时才执行

#### 3、可以将x参数默认值设为undefined，表明这个参数可省略

    function getSth(a, b=undefined, c)
#### 4、reset参数：一个真正的数组，可以完美取代arguments

    function getaa(...nums) {
      for(let el of nums){
        ...
      }
    }

    注意一下：
    reset参数只能是最后一个参数，否则会报错
    函数的length也不把reset计算在内


#### 5、箭头函数
- 无arguments，要用就用reset参数
- 根本没有自己的this，导致内部this就是外层代码的this
- 对象本身不构成作用域

      const cat = {
        lives: 9,
        jumps: () => {
            this.lives--;
          }
      }
      这里的this指向全局