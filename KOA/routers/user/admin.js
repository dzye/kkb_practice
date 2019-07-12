const Router = require('koa-router');
let admin = new Router();
admin.get('/admin', async ctx => {
    ctx.body = '个人a';
})
module.exports = admin.routes();