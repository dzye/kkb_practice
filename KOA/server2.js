const koa = require('koa');
const Router = require('koa-router');

let server = new koa();
server.listen(8080);

let router = new Router();

let user = new Router();
user.get('/a', async ctx => {
    ctx.body = '个人a';
})
let company = new Router();
company.get('/a', async ctx => {
    ctx.body = '公司a';
})

router.use(user.routes());
router.use(company.routes());

router.use('/user', user.routes());
router.use('/company', company.routes());

server.use(router.routes());