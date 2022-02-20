---
title: cookie和session
date: 2022-02-20 23:19:58
tags:
  - 前端学习
  - Node
categories: 前端学习
---

<!-- toc -->
<!--more-->

[toc]

## cookie与session概述
网站可以保持我们的登录状态。

## cookie
网站服务器程序可以在浏览器中写入cookie，然后浏览器再次访问这个网站时，就会带着这个cookie。

实例代码如下所示

``` js
router.get("/", async ctx => {
    ctx.cookies.set("username","xiaoming");
    ctx.body = "hello cookie";
})
```

可以在chrome调试工具中的network选项卡查看cookie内容

写入cookie之后，这个浏览器再次访问这个网站的任何一个页面，都会带着这个cookie。

通过`maxAge`可以设置cookie过期的毫秒数，实例代码如下所示

``` js
ctx.cookies.set("username","xiaoming",{
    maxAge:5000 //过期时间设置为五秒
})
```

可以通过下面的方法获取cookie。

``` js
router.get("/images", async ctx => {
    let usr = ctx.cookies.get("username");
    ctx.body = usr;
})
```
### 记录网页访问次数

利用cookie，可以记录客户端访问浏览器的次数，实例代码如下所示：

``` js
router.get("/count", async ctx => {
    let count = ctx.cookies.get("count");
    if(count > 0){
        count = ++count;
        ctx.cookies.set("count",count,{
            maxAge:2000
        });
    }else{
        count = 1;
        ctx.cookies.set("count",1);
    }
    ctx.body = count
})
```

## session

利用cookie在客户端存储数据是完全透明的，如果存储一些用户信息，会导致很严重的安全问题，所以为了记录用户的登录状态，需要使用cookie与session结合的方式。

``` bash
cnpm install --save koa-session
```

例如给session设置一个count属性，可以直接通过赋值的方式

``` js
ctx.session.count = 0;
```

获取也可以使用相同的方法

``` js
let count = ctx.session.count
```

#### 记录网页访问次数

``` js
const session = require("koa-session");
//加密的密钥，服务器通过加密的cookie获取session
app.keys = ['secret'];
app.use(session({
    maxAge:2000,
},app))

router.get("/session", async ctx => {
    if(ctx.session.count>0){
        ctx.session.count = ++ctx.session.count;
    }else{
        ctx.session.count = 1
    }
    ctx.body = ctx.session.count
})
```

## 登录验证

* 首页：任何人都可以访问
* 登录页：提供表单，用户可以通过表单输入登录信息。
* 视频页：登录成功后可查看，并提供注销功能。

``` js
//处理表单
router.post("/login", async ctx => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    if(username == "admin" && password == "123456"){
        ctx.session.username = username
        ctx.redirect("/video")
    }else{
        ctx.redirect("/")
    }
})

//视频页
router.get("/video", async ctx => {
    console.log(ctx.session.username)
    if(ctx.session.username){
        await ctx.render("c",{username:ctx.session.username})
    }else{
        ctx.redirect("/")
    }
})
//表单页面
router.get("/login", async ctx => {
    await ctx.render("index")
})
//注销
router.get("/logout", async ctx => {
    ctx.session.username = ""
    ctx.redirect("/")
})
```


## 课后练习
实现晓舟报告的登录功能，要求如下：
1. 点击登录按钮，跳转至表单页面，输入用户名和密码后即实现登录效果。
1. 登录后，任何一个页面都可以显示用户名。

server.js
```js
const Koa = require("koa");
const router = require("koa-router")();
const views = require("koa-views");
const parser = require("koa-parser");
const nunjucks = require("nunjucks");
const session = require("koa-session");

const app = new Koa();

app.keys = ["123456"];

app.use(session({
    maxAge: 30 * 1000,
}, app));

app.use(views(__dirname + "/views", {
    map: {
        html: "nunjucks"
    }
}));

app.use(parser());

// 首页 ：任何用户都可以访问
router.get("/", async (ctx) => {
    let username = ctx.cookies.get("username");
    await ctx.render("home.html", {
        username,
    });
});

// 登录页 ：任何用户都可以访问
router.get("/login", async (ctx) => {
    let username = ctx.cookies.get("username");
    if (username) {
        ctx.session.user = "";
        ctx.cookies.set("username", "");
    }
    await ctx.render("login.html");
});

// 内容页 ：只有登录成功后才可以访问
router.get("/list", async (ctx) => {
    let username = ctx.cookies.get("username");

    if (ctx.session.user) {
        await ctx.render("list.html", {
            username,

        });
    } else {
        ctx.redirect("/")
    }
});

router.get("/logout", async (ctx) => {
    ctx.session.user = "";
    ctx.cookies.set("username", "");
    ctx.redirect("/");
})

// 处理请求的路由
router.post("/login", async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    if (username === "admin" && password === "123456") {
        ctx.session.user = "admin";
        ctx.cookies.set("username", username, {
            maxAge: 30 * 1000
        });
        // 重定向
        ctx.redirect("/list");
    } else {
        ctx.redirect("/");
    }
});

app.use(router.routes());

app.listen(3000, () => {
    console.log("server listening on port 3000"); //http://127.0.0.1:3000
});
```
list.html
```html
{% extends "./views/layout.html"%}

{% block content %}
<h1>列表</h1>
{% endblock %}
```
home.html
```html
{% extends "./views/layout.html"%}

{% block content %}
<h1>首页</h1>
{% endblock %}

```
login.html
```html
{% extends "./views/layout.html"%}

{% block content %}
<form action="/login" method="post">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <input type="submit" value="Login">

</form>
{% endblock %}

```
layout.html
```html

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <a href="/">首页</a>
    <a href="/list">列表</a>
    <div style="float:right;">
        {% if username %}
        <span>{{username}}，<a href="/logout">注销</a></span>
        {% else %}
        <a href="/login">登录</a>
        {% endif %}
    </div>
    {% block content %}{% endblock %}
</body>

</html>
```

