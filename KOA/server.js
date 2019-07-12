const koa = require('koa');
const user = require('./routers/user');
let server = new koa();
server.listen(8080);
server.use(user);