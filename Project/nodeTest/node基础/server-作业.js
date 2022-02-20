const http = require('http');
const fs = require('fs');
//2. 创建服务器对象
const server = http.createServer();
//3. 开启服务器
server.listen(80, () => {
    console.log('Server is running...');
});
//4. 监听浏览器请求并进行处理
server.on('request', (req, res) => {

    //6. 读取文件
    fs.readFile('./index.html', 'utf-8', (err, data) => {
        if (err) {
            return console.log(err);
        }
        //7. end方法返回读取的文件字符串，浏览器会显示该文件内容
        res.end(data);
    })
});