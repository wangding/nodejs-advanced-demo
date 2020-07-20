#!/usr/bin/env node

const Koa = require('koa'),
      fakeAsync = require('./lib/task');

const app = new Koa(),
      log = console.log;

app.use(async(ctx, next) => {
  const start = Date.now();
  await next();
  const end  = Date.now();
  log(`${ctx.method} ${ctx.path} - ${end-start}ms`);
});

app.use(async(ctx, next) => {
  ctx.body = 'hello world! ' + await fakeAsync(1) + 'ms';
});

app.listen(8080);
