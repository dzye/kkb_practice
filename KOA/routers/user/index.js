const Router = require('koa-router');
const admin = require('./admin');
const company = require('./company');
let user = new Router();
user.use('/user', admin);
user.use('/user', company);
module.exports = user.routes();