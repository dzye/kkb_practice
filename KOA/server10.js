const koa = require('koa');
let server = new koa();
server.listen(8080);

server.keys = [
    'asdfagfdweevxzcvzxawqq',
    'fsaewrttrynvbnhgjhgmvb',
    'wqaszedfvbynhmmyhukpnn'
]
server.use(async ctx => {
    // ctx.cookies.set('user', 'dzye', {
    //     maxAge: 2 * 1000 * 3600 * 24,
    //     signed: true
    // })
    console.log(ctx.cookies.get('user', {
        signed: true
    }));
    ctx.body = '111';
})