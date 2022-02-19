const Koa = require("koa"); // 引入Koa构造函数
const router = require("koa-router")(); // koa-router引入之后是一个函数 引入并执行
const static = require("koa-static");
const app = new Koa(); // 创建应用

// __dirname node的全局变量，可以直接获取当前项目的绝对路径
// 设置好静态目录，可以直接访问当前目录下的文件，如http://127.0.0.1:3000/logo.jpg 
app.use(static(__dirname + "/public/"));

// //引入一个中间件，中间件即是一个函数 请求之后到响应之前执行
// app.use(async (ctx, next) => {
//     ctx.body = "hello koa!"; // node 的res.end()差不多
// });

router.get("/", async (ctx) => {
    // ctx.body = "home page";
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