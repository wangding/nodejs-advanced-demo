const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = '<h1>XBlog</h1>';
});

module.exports = router;
