const router = require('koa-router')(),
      log    = console.log;

router.prefix('/api/authors');

class ResData {
  constructor() {
    this.code = 0;
    this.msg  = 'ok';
    this.count= 0;
    this.data = '';
  }
};

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query,
      res = new ResData();

  log(`得到漫画书作者列表，page = ${page}, limit = ${limit}`);
  ctx.body = res;
});

router.get('/:authorName', async (ctx, next) => {
  var { authorName } = ctx.params,
      res = new ResData();

  log(`按作者名查询，authorName = ${authorName}`);
  ctx.body = res;
});

router.post('/', async (ctx, next) => {
  var { authorName } = ctx.request.body,
      res = new ResData();

  log(`添加漫画书作者，authorName = ${authorName}`);
  ctx.body = res;
});

router.put('/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { authorName } = ctx.request.body,
      res = new ResData();

  log(`修改 ID 为 ${id} 的漫画书作者名称为 ${authorName}`);
  ctx.body = res;
});

router.delete('/:id', async (ctx, next) => {
  var { id } = ctx.params,
      res = new ResData();

  log(`删除 ID 为 ${id} 的漫画书作者`);
  ctx.body = res;
});

module.exports = router;
