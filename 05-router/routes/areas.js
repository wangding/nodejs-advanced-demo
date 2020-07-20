const router = require('koa-router')(),
      log    = console.log;

router.prefix('/areas');

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  log(`得到漫画书区域列表，page = ${page}, limit = ${limit}`);
  ctx.body = '查询成功';
});

router.get('/:areaName', async (ctx, next) => {
  var { areaName } = ctx.params;

  log(`按区域名查询，areaName = ${areaName}`);
  ctx.body = '查询成功';
});

router.post('/', async (ctx, next) => {
  var { areaName } = ctx.request.body;

  log(`添加区域，area = ${areaName}`);
  ctx.body = '添加成功';
});

router.put('/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { areaName } = ctx.request.body;

  log(`修改 ID 为 ${id} 的区域名称为 ${areaName}`);
  ctx.body = '修改成功';
});

router.delete('/:id', async (ctx, next) => {
  var { id } = ctx.params;

  log(`删除 ID 为 ${id} 的区域`);
  ctx.body = '删除成功';
});

module.exports = router;
