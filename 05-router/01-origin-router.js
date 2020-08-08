#!/usr/bin/env node

const Koa = require('koa');

const app = new Koa(),
      log = console.log;

app.use(async (ctx, next) => {
  if(ctx.method === 'GET' && ctx.path === '/authors/') {
    log('得到漫画书作者列表');
    ctx.body = '查询成功';
  }

  if(ctx.method === 'GET' && /\/authors\/\w/.test(ctx.path)) {
    log('按作者名查询');
    ctx.body = '查询成功';
  }

  if(ctx.method === 'POST' && ctx.path === '/authors/') {
    log('添加新的漫画书作者');
    ctx.body = '添加成功';
  }

  if(ctx.method === 'PUT' && /\/authors\/(\d)+$/.test(ctx.path)) {
    log('修改某 ID 的漫画书作者名称');
    ctx.body = '修改成功';
  }

  if(ctx.method === 'DELETE' && /\/authors\/(\d)+$/.test(ctx.path)) {
    log('删除某 ID 的漫画书作者');
    ctx.body = '删除成功';
  }
});

app.listen(8080);
