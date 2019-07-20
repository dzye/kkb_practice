const Router = require('koa-router');
const fs = require('await-fs');
const path = require('path');
let router = new Router();
const table = 'banner_table';
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
const page_type = 'banner';
const page_types = {
    'banner': 'banner管理',
    'catalog': '类目管理',
    'article': '文章管理',
};
router.get('/', async ctx => {
    const {
        HTTP_ROOT
    } = ctx.config;

    let datas = await ctx.db.query(`SELECT * FROM ${table}`);
    await ctx.render('admin/table', {
        HTTP_ROOT,
        type: 'view',
        datas,
        action: `${HTTP_ROOT}/admin/banner`,
        fields,
        page_types,
        page_type
    })
});
router.post('/', async ctx => {
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
router.get('/delete/:id', async ctx => {
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
        await fs.unlink(path.resolve(UPLOAD_DIR, src)); //await-fs 包封装有问题 需要在index.js 添加一种没有data情况的返回
        await ctx.db.query(`DELETE FROM ${table} WHERE ID=?`, [id]);
        ctx.redirect(`${HTTP_ROOT}/admin/banner`);
    }
});
router.get('/get/:id/', async ctx => {
    let {
        id
    } = ctx.params;
    const {
        HTTP_ROOT
    } = ctx.config;
    let rows = await ctx.db.query(`SELECT * FROM ${table} WHERE ID=?`, [id]);
    if (rows.length == 0) {
        ctx.body = {
            err: 1,
            msg: 'no this data'
        };
    } else {
        ctx.body = {
            err: 0,
            msg: 'success',
            data: rows[0]
        };
    }
})
router.post('/modify/:id/', async ctx => {
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
    await ctx.db.query(`UPDATE ${table} SET title=?,src=?,href=?,serial=? WHERE ID=?`, [title, src, href, serial, id]);
    ctx.redirect(`${HTTP_ROOT}/admin/banner`);
});

module.exports = router.routes();