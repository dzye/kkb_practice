const Router = require('koa-router');
let router = new Router();

router.get('/api', async ctx => {
    ctx.body = '111';
})
module.exports = router.routes();