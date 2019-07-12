const mysql = require('mysql');
const co = require('co-mysql');
let conn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    database: '20190708'
});

let db = co(conn);

module.exports = db;