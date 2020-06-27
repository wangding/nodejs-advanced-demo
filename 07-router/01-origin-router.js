#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('koa-logger');
const app    = new Koa();

app.use(logger());

app.use(async (ctx, next) => {
  await next();

  if(ctx.status === 404) {
    ctx.status = 404;
    ctx.body = '<h1>杯具，您访问的页面丢失了！</h1>'
  }
});

app.use(async (ctx, next) => {
  if(ctx.method === 'GET' && ctx.path === '/') {
    ctx.body = '<h1>XBlog</h1>';
  }

  if(ctx.method === 'GET' && ctx.path === '/user/id') {
    ctx.body = '<h1>王顶的自留地!</h1>';
  }

  if(ctx.method === 'GET' && ctx.path === '/blog/id') {
    ctx.body = '<h1>Node.js 高级实战</h1>'
  }
});

app.listen(8080);
