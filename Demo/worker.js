self.onmessage = function(e) {
    console.log(1111, e.data);
  
    // 向主文件发送信息
    self.postMessage(workerResult);
  }