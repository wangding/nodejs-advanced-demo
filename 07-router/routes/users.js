const Router = require('koa-router');
const router = new Router();

router.get('/user/id', async (ctx, next) => {
  ctx.body = '<h1>王顶的自留地!</h1>';
});

module.exports = router;
