const koa = require('koa');
const Router = require('koa-router');

let server = new koa();
server.listen(8080);

let router = new Router();
router.get('/a', async ctx => {
    ctx.body = "aaaaaa";
})

server.use(router.routes());