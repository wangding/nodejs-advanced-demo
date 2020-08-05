const router = require('koa-router')(),
      {tag} = require('../models'),
      log    = console.log;

router.prefix('/api/tags');

router.get('/', async (ctx, next) => {
  let {page, limit} = ctx.query;

  ctx.body = await tag.getTagsInPage(page, limit);
});

router.get('/:tagName', async (ctx, next) => {
  let {tagName} = ctx.params;

  ctx.body = await tag.getTagsByName(tagName);
});

router.post('/', async (ctx, next) => {
  let {tagName} = ctx.request.body;

  ctx.body = await tag.addTag(tagName);
});

router.put('/:id', async (ctx, next) => {
  let {id} = ctx.params,
      {tagName} = ctx.request.body;

  ctx.body = await tag.updateTagByID(id, tagName);
});

router.delete('/:id', async (ctx, next) => {
  let {id} = ctx.params;

  ctx.body = await tag.deleteTagByID(id);
});

module.exports = router;
