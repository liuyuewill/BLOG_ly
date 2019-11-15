- 支持了ts 和 众多es6，es7 特性

- testcafe不提供浏览器环境, 只需要在命令行修改浏览器名称。比如 testcafe safari index.js

- testcafe 支持异步，不需要为 lazyload 的 dom 特殊处理。可直接选择

- TestCafe provides a number of [actions](https://devexpress.github.io/testcafe/documentation/test-api/actions/)

  - click
  - hover
  - typeText
  - setFilesToUpload

  ```JS
  import { Selector } from 'testcafe';
  
  fixture `Getting Started`
      .page `http://devexpress.github.io/testcafe/example`;
  
  test('My first test', async t => { // t : is used to access test run API
      await t
          .typeText('#developer-name', 'John Smith') // typeText(地方，要输入的值)
          .click('#submit-button');
    	const articleHeader = await Selector('.result-content').find('h1');
  
      // Obtain the text of the article header
      let headerText = await articleHeader.innerText;
  });
  ```

- async

  ```js
  test( 描述, async(t) =>{
  
  })
  ```

- assertion

  .expect (...).eql(...)

  ```JS
  import { Selector } from 'testcafe';
  
  fixture `Getting Started`
      .page `http://devexpress.github.io/testcafe/example`;
  
  test('My first test', async t => {
      await t
    			// 行为
          .typeText('#developer-name', 'John Smith')
          .click('#submit-button')
  
          // 断言
          .expect(Selector('#article-header').innerText).eql('Thank you, John Smith!');
  });
  ```

  