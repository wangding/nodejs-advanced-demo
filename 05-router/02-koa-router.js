#!/usr/bin/env node

const Koa    = require('koa'),
      Router = require('koa-router');

const app    = new Koa(),
      log    = console.log,
      router = new Router();

router.get('/authors/', async (ctx, next) => {
  log('得到漫画书作者列表');
  ctx.body = '查询成功';
});

router.get('/authors/:authorName', async (ctx, next) => {
  log('按作者名查询');
  ctx.body = '查询成功';
});

router.post('/authors/', async (ctx, next) => {
  log('添加新的漫画书作者');
  ctx.body = '添加成功';
});

router.put('/authors/:id', async (ctx, next) => {
  log('修改某 ID 的漫画书作者名称');
  ctx.body = '修改成功';
});

router.delete('/authors/:id', async (ctx, next) => {
  log('删除某 ID 的漫画书作者');
  ctx.body = '删除成功';
});

app.use(router.routes());

app.listen(8080);
