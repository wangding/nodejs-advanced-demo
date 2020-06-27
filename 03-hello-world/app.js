#!/usr/bin/env node

const Koa = require('koa');
const app = new Koa(),
      log = console.log;

app.use((ctx, next) => {
  log('hello world');
  ctx.body = 'hello world';
});

app.listen(8080);
