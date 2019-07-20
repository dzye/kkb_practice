const Router = require('koa-router');

let router = new Router();

router.get('/', async ctx => {
    let banners = await ctx.db.query('SELECT * FROM banner_table ORDER BY serial');
    await ctx.render('www/index', {
        banners,
        catalogs: [],
        HTTP_ROOT: ctx.config.HTTP_ROOT
    })
})
module.exports = router.routes();