const Koa = require('koa');
const router = require('koa-router')();
const views = require('koa-views');
const nunjucks = require('nunjucks');
const session = require('koa-session');
const app = new Koa();

// 密钥
app.keys = ["123456"];

app.use(session({
    maxAge: 10000,
}, app));

app.use(views(__dirname + '/views', {
    map: {
        html: 'nunjucks'
    }
}));

router.get('/', async (ctx) => {
    // cookie是以明值对的方式记录在客户端（浏览器）的
    ctx.cookies.set("user", "admin"); // 设置cookie
    ctx.body = 'cookie';
});

router.get('/test', async (ctx) => {
    let user = ctx.cookies.get("user"); // 获取cookie
    ctx.body = user;
});

// 记录网页访问次数（cookie）
router.get('/count', async (ctx) => {
    let count = ctx.cookies.get("count"); // 获取cookie
    if (count > 0) { // 判断是否有cookie
        ++count;
        ctx.cookies.set("count", count, {
            maxAge: 2000, // 设置cookie过期时间为2秒
        }); // 重新设置+1值
    } else {
        count = 1;
        ctx.cookies.set("count", 1);
    }
    ctx.body = count;
});

// 设置session
router.get('/session', async ctx => {
    ctx.session.user = "admin";
    ctx.body = "Set session"
});

// 获取session，如果过期就获取不到了
router.get('/session_test', async ctx => {
    let user = ctx.session.user;
    ctx.body = user;
});

// 记录网页访问次数(session)
router.get("/session_test1", async ctx => {
    if (ctx.session.count > 0) { // 判断是否有session
        ++ctx.session.count; // 自加1
    } else {
        ctx.session.count = 1; //设置为0
    }
    ctx.body = ctx.session.count;
});

app.use(router.routes());

app.listen('3000', () => {
    console.log('server listening on');
});