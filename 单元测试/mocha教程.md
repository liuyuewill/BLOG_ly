### 安装

先全局和项目分别安装：

```JS
npm install -g mocha
npm install --save-dev mocha

再 package.json 里加：
"scripts": {
    "test": "mocha"
}
```

### 项目目录

![image-20191017135929556](/Users/liuyue/Library/Application Support/typora-user-images/image-20191017135929556.png)

- 测试文件写在 test 文件夹里，mocka运行时默认会执行test目录下的所有js文件（仅限于**test**以下这一层级，对**test/subtest**这一层级并不执行）

- index.test.js 为

```JS
var addNum=require('../src/index')

describe('测试index.js', function() {  // 一个测试脚本里有1个或多个 describe 块, 即"测试套件"（test suite）
  describe('测试addNum函数', function() {
    it('两数相加结果为两个数字的和', function() { // 每个 describe 里有一个或多个 it，即"测试用例"（test case）
       if(addNum(1,2)!==3){
         throw new Error("两数相加结果不为两个数字的和")；
       }
    });
  });
});
```

- 然后直接运行 npm test 即可



### 断言库 chai

因为上面例子报错的方法是： throw new Error("两数相加结果不为两个数字的和")  很繁琐。chai 对我们上面抛异常方法的一个封装，当判断失败时会抛出一个异常。

- 特点：如果有用例未通过，断言库还会打印出期望结果3 和 实际结果2
- 属性
  - expect
  - asset
  - should

```JS
var addNum = require('../demoTest.js')
var expect = require('chai').expect;
var asset = require('chai').asset;

describe('测试index.js', function () {
    describe('测试addNum函数1', function () {
        it('两数相加结果为两个数字的和', function () {
            expect(addNum(1, 2)).to.be.equal(103) // 用了 chai 的属性
        });
    });
});



// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```



### 其他

- 因 package.json 里配置是

  ```js
  "scripts": {
      "test": "mocha" // mocha 默认运行 test 子目录里面的测试脚本
  }
  所以 npm test 会测试所有文件
  mocha 默认只运行 test 子目录里面的测试脚本，如果test里还有子目录，那须加上--recursive参数：
  mocha --recursive
  ```

  

- 挑出某几个测试文件来执行

  ```JS
  mocha test/index.test1.js  // 想单一测某个测试文件
  mocha test/index.test.js test/add.test.js // 想测某几个测试文件
  
  // 命令行指定测试脚本时，可以使用通配符
  mocha spec/{my,awesome}.js
  mocha test/unit/*.js
  ```



### mocha 与 es6

- index.test.js文件为：

  ```JS
  import addNum from '../demoTest.js'
  import {expect} from 'chai'
  
  describe('测试index.js', function () {
      describe('测试addNum函数1', function () {
          it('两数相加结果为两个数字的和', function () {
              expect(addNum(1,2)).to.be.equal(103)
          });
      });
  });
  ```

- demoTest.js

  ```JS
  /**
   * 加法函数
   * @param {第一个数} a 
   * @param {第二个数} b 
   */
  export default (a,b)=>{
      return a+b-1;
  }
  ```

- 安装Babel7

  ```js
  npm i --save-dev @babel/core @babel/cli @babel/preset-env @babel/register
  
  "devDependencies": {
     "@babel/cli": "^7.2.3",
     "@babel/core": "^7.4.0",
     "@babel/preset-env": "^7.4.2",
     "@babel/register": "^7.4.0",
     "chai": "^4.2.0",
     "mocha": "^6.0.2"
  }
  
  .babelrc 文件里配置：
  {
    "presets": [
      "@babel/env"
    ]
  }
  
  
  然后package.json里
  "scripts": {
     "test": "mocha --require @babel/register"  // --require @babel/register 重点喔
  }
  有不少教程里写地是：
  // babel7
  --compilers js:@babel/register
  // babel7之前
  --compilers js:babel-core/register
  // 其实 --compilers这个方法已经被废弃了
  
  最后，执行 npm test 就可以了
  ```

### 异步测试

- Mocha默认每个测试用例最多执行2000毫秒，如果到时没有得到结果，就报错

  ```JS
  1、普通异步
  测试用例：
  it('测试应该5000毫秒后结束', function(done) {
    var x = true;
    var f = function() {
      x = false;
      expect(x).to.be.not.ok;
      done(); // ！！！！！！必须写，为了通知Mocha测试结束
    };
    setTimeout(f, 4000);  // 4000毫秒之后，才有运行结果, 所以，跑当前测试文件时，时间不能少于4000ms
  });
  
  mocha -t 5000 timeout.test.js
  
  
  2、异步请求
  it('异步请求应该返回一个对象', function(done){
    request
      .get('https://api.github.com')
      .end(function(err, res){
        expect(res).to.be.an('object');
        done();// ！！！！！！必须写，为了通知Mocha测试结束
      });
  });
  
  mocha -t 10000 async.test.js
  
  
  
  
  2、mocha 内置对 Promise 的支持，等到它的状态改变，再执行断言，而不用显式调用done
  it('异步请求应该返回一个对象', function() {
    return fetch('https://api.github.com')
      .then(function(res) {
        return res.json();
      }).then(function(json) {
        expect(json).to.be.an('object');
      });
  });
  
  ```

### 测试用例的钩子

```js
describe('hooks', function() {

    before(function() {
      // 在本区块的所有测试用例之前执行
    });

    after(function() {
      // 在本区块的所有测试用例之后执行
    });

    beforeEach(function() {
      // 在本区块的每个测试用例之前执行
    });

    afterEach(function() {
      // 在本区块的每个测试用例之后执行
    });

    // test cases
});
```

### 测试用例的管理：只运行某个测试套件或测试用例怎么办

```JS
it.only('1 加 1 应该等于 2', function() { // 调用it.only就可以了执行它
  expect(add(1, 1)).to.be.equal(2);
});
it.skip('任何数加0应该等于自身', function() { // 调用it.skip就会忽略它
  expect(add(1, 0)).to.be.equal(1);
});

it('任何数加0应该等于自身', function() {
  expect(add(1, 0)).to.be.equal(1);
});


mocha test/add.test.js 执行时，只有带 only 方法的测试用例才会执行
```



参考：http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html

