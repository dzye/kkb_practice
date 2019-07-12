const koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
let server = new koa();
let router = new Router();
server.listen(8080);

router.all(/(\.jpg|\.png|\.gif)$/i, static('./static', {
    maxage: 1000 * 60 * 60 * 24 * 30
}))
router.all(/(\.html|\.htm)$/i, static('./static', {
    maxage: 1000 * 60 * 60 * 24,
}))

router.all('', static('./static', {
    maxage: 1000 * 60 * 60 * 24 * 30,
}))

server.use(router.routes());