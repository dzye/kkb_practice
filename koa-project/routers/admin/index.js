const Router = require('koa-router');
const fs = require('await-fs');
const path = require('path');
const common = require('../../libs/common');
let router = new Router();

router.get('/login', async ctx => {
    await ctx.render('admin/login', {
        HTTP_ROOT: ctx.config.HTTP_ROOT,
        errmsg: ctx.query.errmsg
    });
})
router.post('/login', async ctx => {
    const {
        HTTP_ROOT
    } = ctx.config;
    let {
        username,
        password
    } = await ctx.request.fields;

    let admins = JSON.parse((await fs.readFile(path.resolve(__dirname, '../../admins.json'))).toString());

    function findadmin(username) {
        let a = null
        admins.forEach(admin => {
            if (admin.username == username) {
                a = admin;
            }
        })
        return a;
    }
    let admin = findadmin(username);
    if (!admin) {
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('用户名不存在')}`);
    } else if (admin.password != common.md5(password + ctx.config.ADMIN_PREFIX)) {
        ctx.redirect(`${HTTP_ROOT}/admin/login?errmsg=${encodeURIComponent('密码错误')}`);
    } else {
        ctx.session['admin'] = username;
        ctx.redirect(`${HTTP_ROOT}/admin/`);
    }
})
router.all('*', async (ctx, next) => {
    const {
        HTTP_ROOT
    } = ctx.config;
    if (ctx.session['admin']) {
        next();
    } else {
        ctx.redirect(`${HTTP_ROOT}/admin/login`);
    }
})
router.get('/banner', async ctx => {
    ctx.body = 'aaa';
})
router.get('/catalog', async ctx => {
    ctx.body = 'bbb';
})
router.get('/artical', async ctx => {
    ctx.body = 'ccc';
})
module.exports = router.routes();