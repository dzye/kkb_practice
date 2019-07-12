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
    ctx.assert(username, 400, '用户名不能为空');
    ctx.assert(password, 400, '密码不能为空');
    ctx.body = "成功";
});
server.use(router.routes());