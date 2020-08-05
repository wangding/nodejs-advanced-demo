const router = require('koa-router')(),
      {author} = require('../models'),
      log    = console.log;

router.prefix('/api/authors');

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  ctx.body = await author.getAuthorsInPage(page, limit);
});

router.get('/:authorName', async (ctx, next) => {
  var { authorName } = ctx.params;

  ctx.body = await author.getAuthorsByName(authorName);
});

router.post('/', async (ctx, next) => {
  var { authorName } = ctx.request.body;

  ctx.body = await author.addAuthor(authorName);
});

router.put('/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { authorName } = ctx.request.body;

  ctx.body = await author.updateAuthorByID(id, authorName);
});

router.delete('/:id', async (ctx, next) => {
  var { id } = ctx.params;

  ctx.body = await author.deleteAuthorByID(id);
});

module.exports = router;
