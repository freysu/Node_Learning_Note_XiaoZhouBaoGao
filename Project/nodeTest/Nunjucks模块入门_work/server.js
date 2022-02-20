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