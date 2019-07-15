const Router = require('koa-router');
const fs = require('await-fs');
const path = require('path');
let router = new Router();

router.get('/login', async ctx => {
    await ctx.render('admin/login', {});
})
router.post('/login', async ctx => {
    let {
        username,
        password
    } = await ctx.request.fields;
    ctx.body = JSON.parse((await fs.readFile(path.resolve(__dirname, '../../admins.json'))).toString());
    // ctx.body = admins;
})
module.exports = router.routes();