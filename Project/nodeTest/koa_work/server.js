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
