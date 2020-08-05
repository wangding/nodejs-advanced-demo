const router = require('koa-router')(),
      {book} = require('../models'),
      log    = console.log;

router.prefix('/api/books');

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  ctx.body = await book.getBooksInPage(page, limit);
});

module.exports = router;
