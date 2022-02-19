127.0.0.1 : 回环地址，每一台电脑都有该 ip，指向当前使用的电脑

nodejs 中的 js 与 浏览器中 js 的区别：

浏览器中 js ：ECMAScript 核心 + DOM + BOM

Node 中的 js ：ECMAScript 核心 + 全局成员 + 模块系统（系统模块、第三方模块、自定义模块）

全局成员： setTimeout、setInterval、console.log() 等。

注意 ：这几个名称和功能虽然和浏览器中的一样，但是是 Nodejs 自己实现的，与浏览器无关

## 客户端与服务器

- 请求：浏览器向服务器要数据
- 响应：服务器给浏览器发送数据
- 地址：我们可以通过域名或 IP 访问到一个网络，域名或者 IP 就是这个网站的地址。
- 端口：一个 IP 或者一个域名可以找到一台服务器，但是这台服务器可以对外服务多个网站，它们的端口是不同的，因此访问一个站点除了输入 IP 或域名，还要输入端口，平时我们很少输入端口是因为几乎所有的网站都会使用默认的 80 端口，因此不必输入。

## 创建服务器

`http.createServer()` 创建服务器对象，它有两个参数，`req` 是请求 `res` 是响应。  
服务器对象通过`listen`方法定义服务器的端口。然后可以在浏览器中输入`http://127.0.0.1:`加上里定义的端口号。

```JS
const http = require('http');
const server = http.createServer((req, res) => {
    res.end("hello world"); //end方法能够将数据返回给浏览器，浏览器会显示该字符串
})
// http://127.0.0.1:3000
// 开启服务器
server.listen(3000, () => {
    console.log("server listening on 3000");
})
```

- nodemon
  全局安装 nodemon，然后使用 nodemon 启动服务器，在修改文件后，服务器可以自动重启。

## 总结

通过 Node 创建了一个本地服务器，但是在实际开发中，不会直接使用原生的 Node 来编写服务器程序，通常会配合一些框架来提高服务器开发效率。

## 课后练习

创建一个端口为 80 的 node 服务器，满足一下需求：

1. 访问http://127.0.0.1 查看首页内容。
2. 首页内容包括如下 html
   ```HTML
   <h1>我的网站</h1>
   <p>此网站基于Node开发</p>
   ```

## 报错 ：Emitted 'error' event on Server instance at:

Windows 下解决项目未正确关闭引起的 nodejs 端口占用

- 解决办法：

1. 打开 cmd
2. 输入检查端口占用的命令： netstat -ano
3. 寻找本地地址为：`0.0.0.0:80`的 pid，例如找到的 pid 为 4
4. 输入关闭进程的命令：taskkill/pid 4 /f
   (在这里边，/f 的意思是强制关闭进程的意思)
5. 如果提示拒绝访问
6. 先检查用的是管理员权限打开的 cmd
7. 如果是在管理员权限下打开的就按以下操作
   - net stop http
