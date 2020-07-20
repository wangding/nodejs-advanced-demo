const router = require('koa-router')(),
      log    = console.log;

router.prefix('/tags');

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  log(`得到漫画书分类列表，page = ${page}, limit = ${limit}`);
  ctx.body = '查询成功';
});

router.get('/:tagName', async (ctx, next) => {
  var { tagName } = ctx.params;

  log(`按分类查询，tagName = ${tagName}`);
  ctx.body = '查询成功';
});

router.post('/', async (ctx, next) => {
  var { tagName } = ctx.request.body;

  log(`添加漫画书分类，tagName = ${tagName}`);
  ctx.body = '添加成功';
});

router.put('/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { tagName } = ctx.request.body;

  log(`修改 ID 为 ${id} 的漫画书分类名称为 ${tagName}`);
  ctx.body = '修改成功';
});

router.delete('/:id', async (ctx, next) => {
  var { id } = ctx.params;

  log(`删除 ID 为 ${id} 的漫画书分类`);
  ctx.body = '删除成功';
});

module.exports = router;
