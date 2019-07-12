const koa = require('koa');
const Router = require('koa-router');

let server = new koa();
server.listen(8080);

let router = new Router();
router.get('/news/:id/', ctx => {
    let {
        id
    } = ctx.params;
    ctx.body = 'aaa' + id;
});
server.use(router.routes());