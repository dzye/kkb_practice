const koa = require('koa');
const Router = require('koa-router');

let server = new koa();
server.listen(8080);
server.context.a = 12;

let router = new Router();
router.get('/news/', ctx => {
    console.log(ctx.query);
    console.log(ctx.a);
});
server.use(router.routes());