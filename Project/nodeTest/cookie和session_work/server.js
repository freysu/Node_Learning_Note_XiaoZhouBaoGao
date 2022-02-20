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
    await ctx.render("home.html", {
        docListTitle: "docListTitle",
        picListTitle: "picListTitle",
        vidListTitle: "vidListTitle",
        docList,
        vidList,
        picList,
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