const koa = require('koa');
const mysql = require('mysql');
const co = require('co-mysql');

let server = new koa();
server.listen(8080);

let conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: '20190708'
});

let db = co(conn);

server.context.db = db;

server.use(async ctx => {
    let data = await ctx.db.query('SELECT * FROM item_table');
    ctx.body = data;
})