#!/usr/bin/env node

const Koa = require('koa'),
      bodyparser = require('koa-bodyparser'),
      json = require('koa-json'),
      jwt  = require('koa-jwt'),
      { JWT_SECRET_KEY } = require('./conf/constant'),
      logger = require('koa-logger'),
      loadRouters = require('require-directory');

const app = new Koa();

app.use(logger());
app.use(json());
app.use(jwt({ secret: JWT_SECRET_KEY })
    .unless({ path: [/^\/api\/admins\/login$/] }));
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));

loadRouters(module, './routes', {visit: (r)=>{
  app.use(r.routes());
}});

app.listen(8080);
