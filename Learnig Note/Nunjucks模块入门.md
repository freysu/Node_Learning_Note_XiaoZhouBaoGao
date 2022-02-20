---
title: Nunjucks模块入门
date: 2022-02-20 16:19:58
tags:
  - 前端学习
  - Node
categories: 前端学习
---

<!-- toc -->
<!--more-->

[toc]

## 模块引擎概述

模块引擎可以直接设置响应的 HTML 页面，并且可以把后台数据绑定到模板中，然后发送给客户端。

## 安装 nunjucks

在 koa 框架下安装 nunjucks 需要两个第三方模块。

- koa-views：负责配置 koa 的模板引擎。
- nunjucks：下载模板引擎。

执行命令安装这两个模块

```BASH
cnpm install --save koa-views
cnpm install --save nunjucks
```

## 配置模板引擎

```js
//server.js
const Koa = require("koa");
const nunjucks = require("nunjucks");
const views = require("koa-views");
const app = new Koa();

app.use(
  views(__dirname + "/views", {
    //将使用nunjucks模板引擎渲染以html为后缀的文件。
    map: { html: "nunjucks" },
  })
);

app.use(async (ctx) => {
  //render方法渲染模板，第二个参数可以给模板传递参数
  await ctx.render("index", { title: "我的第一个模板" });
});

app.listen(3000, () => {
  console.log("server is running");
});
```

```html
<!-- views/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>{{title}}</title>
  </head>
  <body>
    <h1>hello world</h1>
  </body>
</html>
```

## 结合路由渲染模板

```js
router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "欢迎来到晓舟报告",
  });
});

router.get("/docs", async (ctx, next) => {
  await ctx.render("data", {
    title: "晓舟报告",
    desc: "让学习更高效",
  });
});
```

## 处理表单数据

### 表单概述

通过表单向后台发送数据，首先看两个`form`标签的属性。

- action 属性：指定表单提交数据的路径
- method 属性：指定表单提交数据的请求方法，请求方法包括 get、post。

`form`标签设置完成之后，要对表单空间进行设置

- input.name 属性：指定数据传输的字段
- input.type="submit"：指定提交按钮，点击后提交表单数据

### 获取 get 请求的数据

直接通过`ctx.query`可以获取 get 请求的数据，实例代码如下所示：

```js
//获取get请求的参数
router.get("/form", async (ctx) => {
  await ctx.render("form");
});
router.get("/data", async (ctx) => {
  let username = ctx.query.username;
  await ctx.render("data", { usr: username });
});
```

### 获取 post 请求的数据

若需要获取 post 请求的数据，需要安装第三方模块`koa-parser`来解析 post 请求，实例代码如下所示：

```html
<form action="/data">
  <input type="text" name="username" />
  <input type="submit" value="提交数据" />
</form>
```

```js
const Koa = require("koa");
const parser = require("koa-parser");
const app = new Koa();
app.use(parser());
//获取post请求的参数
router.get("/form", async (ctx) => {
  await ctx.render("form");
});
router.post("/data", async (ctx) => {
  let username = ctx.request.body.username;
  await ctx.render("data", { usr: username });
});
```

```html
<form action="/data" method="POST">
  <input type="text" name="username" />
  <input type="submit" value="提交数据" />
</form>
```

## 课后练习

制作一个登陆验证功能，具体要求如下所示：

1. 登录页登录页填写用户名和密码（正确的用户名为 admin，密码为 123456）
2. 输入正确的用户名和密码，跳转页面提示【登录成功】
3. 输入错误的用户名和密码，跳转页面提示【登录失败】

server.js
```js
const Koa = require("koa");
const router = require("koa-router")();
const views = require("koa-views");
const nunjucks = require("nunjucks");
const parser = require("koa-parser");
const static = require("koa-static");

const app = new Koa();

app.use(parser()); // 进行获取post响应的参数

app.use(views(__dirname + "/views", {
    map: {
        html: "nunjucks",
    }
}));

app.use(router.routes());

router.get("/", async (ctx) => {
    await ctx.render("index", {
        title: "Welcome to home page."
    });
});

router.post("/login", async (ctx) => {
    let _username = "admin";
    let _password = "123456";
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    if (username === "" || password === "") {
        ctx.body = `<script>alert("Please restart input!"); location.href = "./";</script>
        `;
    } else if (_username === username && _password === password) {
        await ctx.render("login", {
            title: "Log in",
            username,
            password,
            dsc: "登录成功!"
        });
    } else {
        await ctx.render("login", {
            title: "Log in",
            dsc: "登录失败!"
        });
    }
});


app.listen(50, () => {
    console.log("server is running");
})
```
login.html
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>home</title>
</head>

<body>
    <h1>{{dsc}}</h1>
    <button id="logoutBtn">Log Out</button>
    <script type="text/javascript">
        let logoutBtn = document.querySelector("#logoutBtn");
        logoutBtn.onclick = () => {
            alert("Log out...Sucess")
            location.href = "./";
        };
    </script>
</body>

</html>
```
index.html
```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Nunjucks_work</title>
</head>

<body>
    <h1>{{title}}</h1>
    <div class="loginDiv">
        <form action="/login" method="post">
            <input type="text" name="username" placeholder="Username">
            <input type="password" name="password" placeholder="Password">
            <input type="submit" value="Login">
        </form>
    </div>
</body>

</html>
```