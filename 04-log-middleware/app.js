#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('./middleware/logger');

const app = new Koa(),
      log = console.log;

/*
app.use(async (ctx, next) => {
  await next();

  //log(`${ctx.method} ${ctx.path} - ${ctx.responseTime}ms`);
  log(`${ctx.method} ${ctx.path} - ${ctx.response.get('X-Response-Time')}ms`);
});

app.use(async (ctx, next) => {
  const start = Date.now();

  await next();
  const end  = Date.now();
  //ctx.responseTime = end - start;
  ctx.set('X-Response-Time', end-start);
});
*/
app.use(logger);

app.use(async (ctx, next) => {
  ctx.body = 'hello koa!';
});

app.listen(8080);
