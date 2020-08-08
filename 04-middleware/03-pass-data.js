#!/usr/bin/env node

const Koa = require('koa');
const app = new Koa(),
      log = console.log;

app.use((ctx, next) => {
  next();
  const cost = ctx.response.get('cost');
  //const cost = ctx.cost;
  log(`${ctx.method} ${ctx.path} - ${cost}ms`);
});

app.use((ctx, next) => {
  const start = Date.now();

  next();
  const end  = Date.now();
  ctx.set('cost', end-start);
  //ctx.cost = end - start;
});

app.use((ctx, next) => {
  ctx.body = 'hello world!';
});

app.listen(8080);
