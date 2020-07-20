#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('koa-logger'),
      Router = require('koa-router');

const app    = new Koa(),
      router = new Router();

app.use(logger());

app.use(async (ctx, next) => {
  await next();

  if(ctx.status === 404) {
    ctx.status = 404;
    ctx.body = '<h1>杯具，您访问的页面丢失了！</h1>'
  }
});

router.get('/', async (ctx, next) => {
  ctx.body = '<h1>XBlog</h1>';
});

router.get('/user/id', async (ctx, next) => {
  ctx.body = '<h1>王顶的自留地!</h1>';
});

router.get('/blog/id', async (ctx, next) => {
  ctx.body = '<h1>Node.js 高级实战</h1>';
});

app.use(router.routes());

app.listen(8080);
