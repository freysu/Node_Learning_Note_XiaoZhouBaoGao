const Koa = require("koa"); // 引入Koa构造函数
const router = require("koa-router")(); // 引入并执行koa-router 路由
const views = require("koa-views"); // 引入koa的模板管理引擎
const nunjucks = require("nunjucks"); // 引入模板引擎
const parser = require("koa-parser"); // 引入获取post请求的模块

const app = new Koa(); // 创建Koa应用

app.use(parser()); // 进行获取Post请求的参数


router.get("/", async (ctx) => {
    //render方法渲染模板，第二个参数可以给模板传递参数
    await ctx.render("index", {
        title: "首页"
    });
});

router.get("/video", async (ctx) => {
    await ctx.render("video", {
        title: "视频"
    });
});

router.get("/login", async (ctx) => {
    // ctx.query 只能接post请求的参数 ctx.query.Input的name属性
    let username = ctx.query.username;
    let password = ctx.query.password;
    await ctx.render("home", {
        username,
        password,
    });
});


router.post("/login", async (ctx) => {
    // ctx.request.body.Input的name属性
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    await ctx.render("home", {
        // uername: username, = username, 
        username,
        password,
    });
});


app.use(views(__dirname + "/views", {
    map: {
        html: "nunjucks",//将使用nunjucks模板引擎渲染以html为后缀的文件。
    }
}));

app.use(router.routes());

// 开启监听3000端口的服务器
app.listen(3000, () => {
    console.log("Server is running");
});