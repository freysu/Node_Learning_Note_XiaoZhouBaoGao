const Koa = require("koa"); // 引入Koa构造函数
const router = require("koa-router")(); // 引入并执行koa-router 路由
const views = require("koa-views"); // 引入koa的模板管理引擎
const nunjucks = require("nunjucks"); // 引入模板引擎

const app = new Koa(); // 创建Koa应用

router.get("/", async (ctx) => {
    let studentList = ["Ming", "Hong", "Liang"];
    //render方法渲染模板，第二个参数可以给模板传递参数
    await ctx.render("index", {
        title: "后台的数据",
        studentList,
        isLogin:false,
        username:'admin',
    });
});

router.get("/images",async (ctx) => {
    await ctx.render("images")
})




app.use(views(__dirname + "/views", {
    map: {
        html: "nunjucks", //将使用nunjucks模板引擎渲染以html为后缀的文件。
    }
}));

app.use(router.routes());

// 开启监听3000端口的服务器
app.listen(3000, () => {
    console.log("Server is running");
});