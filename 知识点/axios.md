### 中文文档
https://www.kancloud.cn/yunye/axios/234845

### 好用插件
es6-promise-always
可以.always() // 正常的Promise实例不能用它

### 常用API
- get 

      axios.get('/user', {
        params: {
          ID: 12345
        }
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      或

      axios.get('/user?ID=12345')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
- post

      axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
- 多个并发请求

      处理并发请求的助手函数
      axios.all(iterable)
      axios.spread(callback)


      function getUserAccount() {
        return axios.get('/user/12345');
      }

      function getUserPermissions() {
        return axios.get('/user/12345/permissions');
      }

      axios.all([getUserAccount(), getUserPermissions()])
      .then(axios.spread(function (acct, perms) {
        // 两个请求现在都执行完成
      }));
- axios直接自己配置数据

      axios({
        method: 'post',
        url: '/user/12345',
        data: {
          firstName: 'Fred',
          lastName: 'Flintstone'
        }
      });
- 自定义配置新建一个 axios 实例


      用axios.create([config])

      var instance = axios.create({
        baseURL: 'https://some-domain.com/api/',
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
      });
### 响应结构

    {
      // `data` 由服务器提供的响应
      data: {},

      // `status` 来自服务器响应的 HTTP 状态码
      status: 200,

      // `statusText` 来自服务器响应的 HTTP 状态信息
      statusText: 'OK',

      // `headers` 服务器响应的头
      headers: {},

      // `config` 是为请求提供的配置信息
      config: {}
    }