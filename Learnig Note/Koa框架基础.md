# Koa 框架大概流程操作

1. `npm init` 初始化一个 npm 项目
2. `cnpm install --save koa` 安装 koa 框架，记得保存到 package.json
3. `cnpm install --save koa-router` 安装 koa-router 路由，记得保存到 package.json
4. `cnpm install --save koa-staic` 安装 Koa-staic 静态文件，记得保存到 package.json
5. `const Koa = require("koa");`
   注意：引入 koa 构造函数的时候要大写
6. `const router = require("koa-router")();`
   注意 Koa-router 引入后要直接执行
7. `const static = require("koa-static");`
8. `const app = new Koa()`
9. `app.use(static(__dirname + 存放静态文件的目录))`
   \_\_dirname 是 node 的全局变量，可以直接获取当前项目的绝对路径
10. `router.get( 要编写的页面 ,async (ctx,next)=>{ 这里可以写这个页面要显示什么，可以用模板字符串换行 })`
    注意要用 async funcion 来进行异步操作
11. `app.use(router.routes())`
    这一步用来引入 koa-router
12. `app.listen( 端口,()=>{ 这里可以写已开启服务器 }) `
    访问的时候，默认是 80 端口（可以省略），http://127.0.0.1

## Koa 框架概述

Koa 是一个基于 Node 的 Web 服务器开发框架，可以更便携地开发 Web 服务器。

## 安装 Koa

在安装 Koa 之前要先初始化一个项目
新建一个空目录，在该目录中打开命令行工具

```bash
npm init
```

初始化完成之后，安装 Koa

```bash
cnpm install --save koa
```

## 创建服务器

通过 require 引入 Koa，使用 Koa 创建服务器。

```JS
const Koa = require("koa"); // 引入Koa构造函数
const app = new Koa(); // 创建应用
// 设置监听端口
//http://127.0.0.1:3000/
app.listen(3000,() => {
    console.log("server is running")
});
```

引入的 Koa 是一个构造函数，通过 new 关键字可以创建一个 koa 应用 app。然后通过 app 的 listen 方法设置监听端口，运行这个程序就可以移动一个 koa 服务器了。
访问本机的 3000 端口可以看到`not found`，这说明服务器已经正常启动了，但是还没有指定服务器响应的内容。
接下来，我们用 app 的 use 方法设置响应的内容，实例代码如下所示。

```JS
const Koa = require("koa"); // 引入Koa构造函数
const app = new Koa(); // 创建应用
// //引入一个中间件，中间件即是一个函数 请求之后到响应之前执行
app.use(async ctx => {
    ctx.body= "hello world";
})
// 设置监听端口
//http://127.0.0.1:3000/
app.listen(3000,() => {
    console.log("server is running")
});
```

app 的 use 方法可以调用一个函数（中间件），这个函数会在请求和相应之间被调用。函数可以接受两个参数。

- ctx：上下文变量，可以获取请求与响应的相关信息。
- next：处理下一个异步函数。

多个 use 方法

```JS
const Koa = require("koa");// 引入Koa构造函数
const app = new Koa();// 创建应用
// //引入一个中间件，中间件即是一个函数 请求之后到响应之前执行
app.use(async (ctx,next) => {
    ctx.body = "hello world"
    await next();
})

app.use(async (ctx,next) => {
    console.log("我是一个中间件")
})
// 设置监听端口
//http://127.0.0.1:3000/
app.listen(3000,() => {
    console.log("server is running")
});

```

## 路由 koa-router

浏览器可以使用不同的方法发送请求，常用的方法如下所示：

- get 请求：用来获取页面或数据
- post 请求：用来提交数据，一般登录的时候，想后台发送用户名和密码可以使用。

```bash
cnpm install --save koa-router
```

```JS
const Koa = require("koa");// 引入Koa构造函数
const router = require("koa-router")();// koa-router引入之后是一个函数 引入并执行
const app = new Koa();// 创建应用

//get是http协议请求的方法
router.get("/", async ctx => {
    ctx.body = "<h1>home page</h1>"
})

router.get("/video", async ctx => {
    ctx.body = "<h1>video page</h1>"
})

app.use(router.routes()) // 在koa项目中引入router

// 设置监听端口
//http://127.0.0.1:3000/
app.listen(3000,() => {
    console.log("server is running")
});
```

## 静态文件

\_\_dirname node 的全局变量，可以直接获取当前项目的绝对路径。

在网页中插入图片，需要在 img 标签中填写图片的地址。web 应用的服务器，只有静态文件目录的文件才可以被 html 页面直接访问。

也就是说，我们需要先创建一个静态文件目录，然后在里面放置图片（或 js，或 css），才能被 html 页面访问。

通过下面的命令下载`koa-static`，可以设置静态文件目录。

```bash
cnpm install --save koa-static
```

引入`koa-static`，可以得到一个 static 函数，通过调用这个 static 函数，便可以将参数的目录设置为一个静态目录了。
这样就可以在网页中看到图片了。

```JS
const Koa = require("koa"); // 引入Koa构造函数
const router = require("koa-router")(); // koa-router引入之后是一个函数 引入并执行
const static = require("koa-static");
const app = new Koa(); // 创建应用

// 设置好静态目录，可以直接访问当前目录下的文件，如http://127.0.0.1:3000/logo.jpg
app.use(static(__dirname + "/public/"));

router.get("/", async (ctx) => {
    ctx.body = `
        <h1>标题</h1>
        <p>这是一段内容。</p>
        <img src='./img/logo.jpg'>
`;
});

router.get("/video", async (ctx) => {
    ctx.body = "video page";
});

app.use(router.routes()); // 在koa项目中引入router

// 设置监听端口
//http://127.0.0.1:3000/
app.listen(3000, () => {
    console.log("Server listening on...")
});
```

## 课后练习

创建一个基于 Koa 的服务器，运行在 80 端口，满足以下需求：

1. 访问`http://127.0.0.1`，显示文字欢迎来到首页。
2. 访问`http://127.0.0.1/doc`，显示有标题、段落和图片的网页内容。
3. `http://127.0.0.1/doc`页面中的标题和段落文字为蓝色，通过外部样式引入。

```JS
/**
 * 1. koa
 * 2. new Koa();
 * 3. koa-router,引入并执行
 * 4. koa-static
 */
// 引入Koa构造函数
const Koa = require("koa");
// 引入并执行koa-router 路由
const router = require("koa-router")();
// 引入koa-static 静态
const static = require("koa-static");

// 创建Koa应用
const app = new Koa();

// 设置静态目录
app.use(static(__dirname + "/public/"));

// 通过路由设置每个页面，异步操作
router.get("/", async (ctx) => {
    ctx.body = "欢迎来到首页"
})

router.get("/doc", async (ctx) => {
    ctx.body = `
    <link rel="stylesheet" href="./css/doc.css">
    <h1>标题</h1>
    <p>段落</p>
    <img src="./img/logo.jpg">
    `
})

// 中间件引用koa-router路由
app.use(router.routes());

// 开启监听80端口的服务器
app.listen(80, () => {
    console.log("Server is running");
})

```

doc.css 文件

```CSS
h1, p{
    color: blue;
}
```
