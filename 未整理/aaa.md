    一、
    判断一个变量是不是数组：
    var arr = [1, 2, 3] 
    Array.isArray(arr)
    arr instanceof Array arr.constructor === Array Object.prototype.toString.call(arr) === '[object Array]'
    arr.constructor = Array

    2. 我们知道逻辑与&&与逻辑或||是短路运算符，短路运算符就是从左到右的运算中前者满足要求，就不再执行后者了； 可以理解为：

    •	&&为取假运算，从左到右依次判断，如果遇到一个假值，就返回假值，以后不再执行，否则返回最后一个真值
    •	||为取真运算，从左到右依次判断，如果遇到一个真值，就返回真值，以后不再执行，否则返回最后一个假值

    应用场景：
    1、	给变量赋初值
    2、	用来进行简单的判断，取代冗长的if语句
    let variable = param && param.prop
    如果param如果为真值则返回param.prop属性，否则返回param这个假值，这样在某些地方防止param为undefined的时候还取其属性造成报错。

    二、空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。因此，遍历内部元素的时候，会得到不同的结果。

    Apply/call/bind区别
    -	Bind会返回一个函数，this指向你定的对象

    三、
    在使用async/await时
    并发：就用Promise.all[awatit 1，await 2]
    继发：用for of
    for(let item of arr){
    let url = await fetch(item)
    console.log(url)
    }


    async function logInOrder(urls) {
    // 并发读取远程URL
    const textPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.text();
    });

    // 按次序输出
    for (const textPromise of textPromises) {
      console.log(await textPromise);
    }
    }
    解析：map里的函数内部是继发，但整个map函数是并发。


    四、防抖debounce
    上面代码中，只要在2500毫秒之内，用户再次击键，就会取消上一次的定时器，然后再新建一个定时器。这样就保证了回调函数之间的调用间隔，至少是2500毫秒。
    为什么要写context和arguments
    function debounce(fn, delay){
      var timer = null; // 声明计时器
      return function() {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
          fn.apply(context, args);
        }, delay);
      };
    }


    五、

    setInterval(function () {
      console.log(2);
    }, 1000);

    sleep(3000);

    function sleep(ms) {
      var start = Date.now();
      while ((Date.now() - start) < ms) {
      }
    }
    setInterval要求每隔1000毫秒，就输出一个2。但是，紧接着的sleep语句需要3000毫秒才能完成，那么setInterval就必须推迟到3000毫秒之后才开始生效。注意，生效后setInterval不会产生累积效应，即不会一下子输出三个2，而是只会输出一个2。



    六、setTimeout(f,0)应用场景
    由于setTimeout(f, 0)实际上意味着，将任务放到浏览器最早可得的空闲时段执行，所以那些计算量大、耗时长的任务，常常会被放到几个小部分，分别放到setTimeout(f, 0)里面执行。
    var div = document.getElementsByTagName('div')[0];

    // 写法一
    for (var i = 0xA00000; i < 0xFFFFFF; i++) {
      div.style.backgroundColor = '#' + i.toString(16);
    }

    // 写法二
    var timer;
    var i=0x100000;

    function func() {
      timer = setTimeout(func, 0);
      div.style.backgroundColor = '#' + i.toString(16);
      if (i++ == 0xFFFFFF) clearTimeout(timer);
    }

    timer = setTimeout(func, 0);

    上面代码有两种写法，都是改变一个网页元素的背景色。写法一会造成浏览器“堵塞”，因为 JavaScript 执行速度远高于 DOM，会造成大量 DOM 操作“堆积”，而写法二就不会，这就是setTimeout(f, 0)的好处。







