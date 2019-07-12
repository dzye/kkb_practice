const koa = require('koa');
const session = require('koa-session');
let server = new koa();
server.listen(8080);

server.keys = [
    'asdfagfdweevxzcvzxawqq',
    'fsaewrttrynvbnhgjhgmvb',
    'wqaszedfvbynhmmyhukpnn'
]
server.use(session({
    maxAge: 20 * 100 * 60 * 60 * 2,
    renew: true
}, server))

server.use(async ctx => {
    if (!ctx.session['view']) {
        ctx.session['view'] = 0;
    }
    ctx.session['view']++;
    console.log(ctx.session['view']);
    ctx.body = `${ctx.session.view}`;
})