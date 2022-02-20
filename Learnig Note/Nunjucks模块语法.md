---
title: Nunjucks模块语法
date: 2022-02-20 19:19:58
tags:
  - 前端学习
  - Node
categories: 前端学习
---

<!-- toc -->
<!--more-->

[toc]

## 概述
`render`方法不仅可以指定渲染的模板，还可以向模板传递数据。
nunjucks模板语法，使其不仅可以展示一行字符串，还可以展示更为丰富的网页效果。

## 循环语句
以晓舟报告的网站为例，视频列表中会显示多条数据，显示的数据条数取决于数据库中的数据量。所以页面的内容应该是应该根据后台数据动态显示。那么如何动态显示数据列表的，实例代码如下所示。

``` json
//数据
{"fruits":["香蕉","苹果","鸭梨"]}
```

``` html
<ul>
    {% for fruit in fruits %}
    <li>{{fruit}}</li>
    {% endfor %}
</ul>
```

## 分支语句

再看晓舟报告的首页，默认情况下，右上角显示的是登录按钮，如果登录之后，会显示用户头像。

也就是说页面的像是内容取决于当前用户状态，这样的功能可以使用分支语句制作，实例代码如下所示：

``` json
//数据
{"isLogin":true}
```

``` html
{% if isLogin %}
    <p>欢迎您来到我的网站</p>
{% else %}
    <p>请登录</p>
{% endif %}
```

## 模板继承

晓舟报告每个页面的头部，都有相同的菜单，那么如果我们在每一个页面都重新写一遍菜单，这样的代码既不利于开发，也不利于维护。所以我们要把公共部分提取出来，可以用模板继承的功能来实现，实例代码如下所示：

``` html
<!-- 模板layout.html -->
<a href="/">首页</a>
<a href="/images">图片</a>
{% block content %}{% endblock %}
```

``` html
<!-- home.html -->
{% extends "./views/layout.html" %}
{% block content %}
<h1>首页</h1>
{% endblock %}
```

``` html
<!-- images.html -->
{% extends "./views/layout.html" %}
{% block content %}
<h1>图片</h1>
{% endblock %}
```
## include

某些页面可能会包含相同的组件，例如晓舟报告的轮播图，这样的内容可以通过`include`引入到网页中，降低网页的耦合。

``` html
{% extends "./views/layout.html" %}

{% block content %}
<h1>首页</h1>

{% include "./views/footer.html" ignore missing %}

{% endblock %}

```


## 课后练习

通过 nunjucks 模板制作晓舟报告网站，功能如下所示：

1. 首页导航效果需要使用模板继承功能
2. 文档列表、博客列表、视频列表要使用后台的数据
3. 如果登录，显示用户名，如果未登录，显示登录按钮（是否登录通过一个变量控制即可）

```js
const Koa = require("koa");
const router = require("koa-router")();
const parser = require("koa-parser");
const nunjucks = require("nunjucks");
const views = require("koa-views");

const app = new Koa();

app.use(parser()); // 进行获取Post请求的参数

app.use(views(__dirname + "/views", {
    map: {
        html: "nunjucks"
    }
}));

router.get("/", async (ctx) => {
    let docList = [
        "中式浪漫!闭幕式折柳送别运动员",
        "成都新增1例本土确诊",
        "冬奥闭幕式中国结创意太绝了",
        "开幕式小雪花来到闭幕式了",
        "羽生结弦与金博洋一起做滑跪"
    ];
    let vidList = [
        "中式浪漫!闭幕式折柳送别运动员",
        "成都新增1例本土确诊",
        "冬奥闭幕式中国结创意太绝了",
        "开幕式小雪花来到闭幕式了",
        "羽生结弦与金博洋一起做滑跪"
    ];
    let picList = [
        "中式浪漫!闭幕式折柳送别运动员",
        "成都新增1例本土确诊",
        "冬奥闭幕式中国结创意太绝了",
        "开幕式小雪花来到闭幕式了",
        "羽生结弦与金博洋一起做滑跪"
    ];
    await ctx.render("index", {
        docListTitle: "docListTitle",
        picListTitle: "picListTitle",
        vidListTitle: "vidListTitle",
        docList,
        vidList,
        picList,
        isLogin: false,
        
    })
})

router.get("/pictures", async (ctx) => {
    await ctx.render("index", {
        title: "pictures",
    })
})

router.get("/videos", async (ctx) => {
    await ctx.render("index", {
        title: "videos",
    })
})


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
            dsc: "登录成功!",
            isLogin:true
        });
            myUsername = username;
    } else {
        await ctx.render("login", {
            title: "Log in",
            dsc: "登录失败!"
        });
    }
});

app.use(router.routes());

app.listen(3000, () => {
    console.log("server listening");
})

```
index.html
```html
{% extends "./views/layout.html" %}

{% block content %}
    <h2>{{docListTitle}}</h2>
    <ul class="docList">
        {% for doc in docList %}
        <li>
            {{doc}}
        </li>
        {% endfor %}
    </ul>
    <h2>{{picListTitle}}</h2>
    <ul class="picList">
        {% for pic in picList %}
        <li>
            {{pic}}
        </li>
        {% endfor %}
    </ul>
    <h2>{{vidListTitle}}</h2>
    <ul class="vidList">
        {% for vid in vidList %}
        <li>
            {{vid}}
        </li>
        {% endfor %}
    </ul>
    </div>
{% endblock %}

```
layout.html
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Demo</title>
</head>
<body>
    <header>
        <a href="./">Home</a>
        <a href="./pictures">Pictures</a>
        <a href="./videos">Videos</a>

        <div>
            {% if isLogin %}
            <p>{{myUsername}}</p>
            {% else %}
            <form action="/login" method="post">
                <input type="text" name="username" placeholder="Username">
                <input type="password" name="password" placeholder="Password">
                <input type="submit" value="Login">
            </form>
            {% endif %}
        </div>
    </header>
    {% block content %}{% endblock %}
</body>
</html>
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
