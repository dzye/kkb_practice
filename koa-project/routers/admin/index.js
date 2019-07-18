const Router = require('koa-router');
const fs = require('await-fs');
const path = require('path');
const common = require('../../libs/common');
let router = new Router();
const table = 'banner_table';
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
const fields = [{
        title: '标题',
        name: 'title',
        type: 'text'
    },
    {
        title: '图片',
        name: 'src',
        type: 'file'
    },
    {
        title: '链接',
        name: 'href',
        type: 'text'
    },
    {
        title: '序号',
        name: 'serial',
        type: 'number'
    },
];
router.get('/banner', async ctx => {
    const {
        HTTP_ROOT
    } = ctx.config;

    let datas = await ctx.db.query(`SELECT * FROM ${table}`);
    await ctx.render('admin/table', {
        HTTP_ROOT,
        type: 'view',
        datas,
        action: `${HTTP_ROOT}/admin/banner`,
        fields
    })
});
router.post('/banner', async ctx => {
    const {
        HTTP_ROOT
    } = ctx.config;
    let {
        title,
        src,
        href,
        serial
    } = ctx.request.fields;
    src = path.basename(src[0].path);
    await ctx.db.query(`INSERT INTO banner_table (title,src,href,serial) VALUES (?,?,?,?)`, [title, src, href, serial]);
    ctx.redirect(`${HTTP_ROOT}/admin/banner`)
});
router.get('/banner/delete/:id', async ctx => {
    const {
        HTTP_ROOT,
        UPLOAD_DIR
    } = ctx.config;
    let {
        id
    } = ctx.params;
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id]);
    ctx.assert(data.length, 400, 'no data');
    if (data.length === 0) {
        ctx.body = 'no data';
    } else {
        let src = data[0].src;
        await fs.unlink(path.resolve(UPLOAD_DIR, src));
        await ctx.db.query(`DELETE FROM ${table} WHERE ID=?`, [id]);
        ctx.redirect(`${HTTP_ROOT}/admin/banner`);
    }
});
router.get('/banner/modify/:id/', async ctx => {
    let {
        id
    } = ctx.params;
    const {
        HTTP_ROOT
    } = ctx.config;
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id]);
    ctx.assert(data.length, 400, 'no data');

    let row = data[0];
    await ctx.render('admin/table', {
        HTTP_ROOT,
        type: 'modify',
        old_data: row,
        action: `${HTTP_ROOT}/admin/banner/modify/${id}`,
        fields
    })
})
router.post('/banner/modify/:id/', async ctx => {
    let {
        id
    } = ctx.params;
    let data = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id]);
    let row = data[0];
    const {
        HTTP_ROOT
    } = ctx.config;
    let {
        title,
        src,
        href,
        serial
    } = ctx.request.fields;
    if (src) {
        src = row.src;
    } else {
        await fs.unlink(path.resolve(UPLOAD_DIR, src));
    }
    console.log(title, src, href, serial);
    await ctx.db.query(`UPDATE ${table} SET title=?,src=?,href=?,serial=? WHERE ID=${id}`, [title, src, href, serial]);
    ctx.redirect(`${HTTP_ROOT}/admin/banner`);
})

module.exports = router.routes();