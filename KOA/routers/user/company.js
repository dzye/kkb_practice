const Router = require('koa-router');
let company = new Router();
company.get('/company', async ctx => {
    ctx.body = '公司a';
})

module.exports = company.routes();