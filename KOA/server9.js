const koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');
let server = new koa();
let router = new Router();
server.listen(8080);

server.use(body({
    uploadDir: './static/upload'
}));

server.use(async ctx => {
    console.log(ctx.request.fields);
    ctx.body = '111';
})