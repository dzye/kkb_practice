const koa = require('koa');
const static = require('koa-static');

let server = new koa();
server.listen(8080);

let statics = new static('./static', {
    maxage: 1000 * 60 * 60 * 24,
    index: '1.html'
});

server.use(statics);