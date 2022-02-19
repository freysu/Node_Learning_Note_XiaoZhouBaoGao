const http = require('http');
// http.createServer() 创建服务器对象 req是请求 res是响应   
const server = http.createServer((req, res) => {
    res.end("hello world"); // end方法能够将数据返回给浏览器，浏览器会显示该字符串
})
// 服务器对象通过listen方法定义服务器的端口。
// http://127.0.0.1:3000
server.listen(3000, () => {
    console.log("server listening on 3000");
})