#!/usr/bin/env node

const Koa = require('koa'),
      bodyparser = require('koa-bodyparser'),
      json = require('koa-json'),
      logger = require('koa-logger'),
      loadRouters = require('require-directory');

const app = new Koa();

app.use(logger());
app.use(json());
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));

loadRouters(module, './routes', {visit: (r)=>{
  app.use(r.routes());
}});

app.listen(8080);
