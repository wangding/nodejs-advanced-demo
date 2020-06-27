const Router = require('koa-router');
const router = new Router();

router.get('/blog/id', async (ctx, next) => {
  ctx.body = '<h1>Node.js 高级实战</h1>';
});

module.exports = router;
