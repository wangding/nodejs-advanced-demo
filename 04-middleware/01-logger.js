#!/usr/bin/env node

const Koa = require('koa');
const app = new Koa(),
      log = console.log;

app.use((ctx, next) => {            // M-logger
  log(`${ctx.method} ${ctx.path}`);
  next();
});

app.use((ctx, next) => {            // M-hello
  ctx.body = 'hello world!';
});

app.listen(8080);
