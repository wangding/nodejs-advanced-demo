const router = require('koa-router')(),
      log    = console.log;

router.prefix('/authors');

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  log(`得到漫画书作者列表，page = ${page}, limit = ${limit}`);
  ctx.body = '查询成功';
});

router.get('/:authorName', async (ctx, next) => {
  var { authorName } = ctx.params;

  log(`按作者名查询，authorName = ${authorName}`);
  ctx.body = '查询成功';
});

router.post('/', async (ctx, next) => {
  var { authorName } = ctx.request.body;

  log(`添加漫画书作者，authorName = ${authorName}`);
  ctx.body = '添加成功';
});

router.put('/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { authorName } = ctx.request.body;

  log(`修改 ID 为 ${id} 的漫画书作者名称为 ${authorName}`);
  ctx.body = '修改成功';
});

router.delete('/:id', async (ctx, next) => {
  var { id } = ctx.params;

  log(`删除 ID 为 ${id} 的漫画书作者`);
  ctx.body = '删除成功';
});

module.exports = router;
