const router  = require('koa-router')();

router.get('/', async (ctx) => {
  await ctx.render('index', { title: '首页' });
});

router.get('/mh-new/', async (ctx) => {
  await ctx.render('new', { title: '最近更新漫画' });
});

router.get('/mh-rank/', async (ctx) => {
  await ctx.render('rank', { title: '漫画榜单' });
});

router.get('/mh-jp/', async (ctx) => {
  await ctx.render('jp', { title: '日本漫画' });
});

router.get('/mh-list/', async (ctx) => {
  await ctx.render('list', { title: '漫画大全' });
});

module.exports = router;
