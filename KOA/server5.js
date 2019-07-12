const koa = require('koa');
const Router = require('koa-router');

let server = new koa();
server.listen(8080);
server.context.a = 12;

let router = new Router();
router.get('/login', ctx => {
    let {
        username,
        password
    } = ctx.query;
    if (!username || !password) {
        ctx.throw(400, '用户名密码为空');
    } else {
        ctx.body = "成功";
    }
});
server.use(router.routes());