#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('./middleware/logger');

const app = new Koa();

app.use(logger);

app.use((ctx, next) => {
  ctx.body = 'hello world!';
});

app.listen(8080);
