#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('koa-logger');

const app = new Koa();

app.use(logger());

app.use(async(ctx, next) => {
  ctx.body = 'hello world!';
});

app.listen(8080);
