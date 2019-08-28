    http://www.runoob.com/submit.htm?email=someone@ example.com

    最常用的三个，href/search/hash
    1、var href  =  window.location.href;//完整的url
    2、var search = window.location.search;//路径的查询部分   【问号 ？及？之后的部分】
    得：?email=someone@ example.com

    3、var hash = window.location.hash;//开始的锚点 【从井号 (#) 开始的 URL（锚）】
    -----------------------------------------------------------------------------------------------
    search常用示例：
    var searchURL = window.location.search;
    searchURL = searchURL.substring(1, searchURL.length);
    var targetPageId = searchURL.split("&")[0].split("=")[1];
    -----------------------------------------------------------------------------------------------

    了解：
    var protocol  =  window.location.protocol;//协议
    var hostname  =  window.location.hostname;//主机名
    var host  =  window.location.host;//主机名+端口号
    var port = window.location.port;//端口号
    var pathname = window.location.pathname;//当前URL的路径部分