#!/usr/bin/env node

const Koa    = require('koa'),
      bodyparser = require('koa-bodyparser'), 
      Router = require('koa-router');

const app    = new Koa(),
      log    = console.log,
      router = new Router();

app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))

router.get('/authors/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  log(ctx.header['user-agent']);
  log(`得到漫画书作者列表，page = ${page}, limit = ${limit}`);
  ctx.body = '查询成功';
});

router.get('/authors/:authorName', async (ctx, next) => {
  var { authorName } = ctx.params;

  log(`按作者名查询，authorName = ${authorName}`);
  ctx.body = '查询成功';
});

router.post('/authors/', async (ctx, next) => {
  var { authorName } = ctx.request.body;

  log(`添加漫画书作者，authorName = ${authorName}`);
  ctx.body = '添加成功';
});

router.put('/authors/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { authorName } = ctx.request.body;

  log(`修改 ID 为 ${id} 的漫画书作者名称为 ${authorName}`);
  ctx.body = '修改成功';
});

router.delete('/authors/:id', async (ctx, next) => {
  var { id } = ctx.params;

  log(`删除 ID 为 ${id} 的漫画书作者`);
  ctx.body = '删除成功';
});

app.use(router.routes());

app.listen(8080);
