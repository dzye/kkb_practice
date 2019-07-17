const koa = require('koa');
const Router = require('koa-router');
const static = require('./routers/static');
const body = require('koa-better-body');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');
const ejs = require('koa-ejs');
const config = require('./config');


let server = new koa();
server.listen(config.PORT);
console.log(`server running at ${config.PORT}`);
let router = new Router();

server.use(body({
    uploadDir: path.resolve(__dirname, './static/upload')
}));
server.keys = fs.readFileSync('.keys').toString().split('\n');

server.use(session({
    maxAge: 20 * 6000 * 1000,
    renew: true
}, server));

server.context.db = require('./libs/database');
server.context.config = config;
ejs(server, {
    root: path.resolve(__dirname, 'template'),
    layout: false,
    viewExt: 'ejs',
    cache: false,
    debug: false
})

// router.use('*', async (ctx, next) => {
//     try {
//         await next();
//     } catch (e) {
//         ctx.throw('500', '服务器错误');
//     }
// })

router.use('/admin', require('./routers/admin'));
router.use('', require('./routers/www'));
static(router);

server.use(router.routes());