### base64 是什么

base64只能算是一个编码算法，对数据内容进行编码来适合传输

64个字符----小写字母a-z、大写字母A-Z、数字0-9、符号"+"、"/"（再加上作为垫字的"="，实际上是65个字符----是一个基本字符集

例子：

```JS
首先，"严"的utf-8编码为E4B8A5，写成二进制就是三字节的"11100100 10111000 10100101"。将这个24位的二进制字符串，按照第3节中的规则，转换成四组一共32位的二进制值"00111001 00001011 00100010 00100101"，相应的十进制数为57、11、34、37，它们对应的Base64值就为5、L、i、l。

所以，汉字"严"（utf-8编码）的Base64值就是5Lil。
```

### 用处

前端页面中，如果有 icon 这种图片，可以选择用 base64 格式，因为 base64 可以存储在本地，就不需要再去请求图片资源了。但要注意：base64 格式的内容会比之前大1/3，所以比较大的文件就不适用 base64

