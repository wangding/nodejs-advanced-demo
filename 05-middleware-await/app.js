#!/usr/bin/env node

const Koa     = require('koa'),
      bigTask = require('./lib/task');
const app = new Koa(),
      log = console.log;

app.use(async (ctx, next) => {
  log('A1');
  const start = Date.now();

  await next();

  const end  = Date.now();
  log(`${ctx.method} ${ctx.path} - ${end-start}ms`);
  log('A2');
});

app.use(async(ctx, next) => {
  log('B1');
  ctx.body = 'hello koa!';
  await bigTask();

  await next();

  log('B2');
});

app.listen(8080);
