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
