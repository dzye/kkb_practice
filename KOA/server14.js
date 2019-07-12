const koa = require('koa');

let server = new koa();
server.listen(8080);

server.context.db = require('./libs/database');
server.use(async (ctx, next) => {
    try {
        await next();
    } catch (e) {
        ctx.body = e;
    }
})
server.use(async ctx => {
    let data = await ctx.db.query('SELECT * FROM item_table');
    ctx.body = data;
})