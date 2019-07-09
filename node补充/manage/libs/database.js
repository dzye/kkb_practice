const mysql = require('mysql');
const co = require('co-mysql');
const config = require('../config');
let sql = mysql.createPool({
    host: config.DB_HOST,
    port: config.DB_PORT,
    user: config.DB_USER,
    password: config.DB_PASS,
    database: config.DB_NAME
})
module.exports = co(sql);