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
    } = ctx.request.fields; //不需要await

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
        await next(); //需要await
    } else {
        ctx.redirect(`${HTTP_ROOT}/admin/login`);
    }
})
router.get('/', async ctx => {
    let {
        HTTP_ROOT
    } = ctx.config;
    ctx.redirect(`${HTTP_ROOT}/admin/banner`);
})

router.use('/banner', require('./banner'));
module.exports = router.routes();