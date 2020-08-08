#!/usr/bin/env node

const Koa = require('koa');
const app = new Koa(),
      log = console.log;

app.use((ctx, next) => {
  const start = Date.now();
  next();
  const end  = Date.now();
  log(`${ctx.method} ${ctx.path} - ${end-start}ms`);
});

app.use((ctx, next) => {
  ctx.body = 'hello world!';
});

app.listen(8080);
