#!/usr/bin/env node

const Koa = require('koa'),
      bodyparser = require('koa-bodyparser'),
      json = require('koa-json'),
      views = require('koa-views'),
      jwt  = require('koa-jwt'),
      { JWT_SECRET_KEY } = require('./conf/constant'),
      logger = require('koa-logger'),
      loadRouters = require('require-directory');

const app = new Koa();

app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
app.use(json());
app.use(views(__dirname + '/views', { extension: 'ejs' }));
app.use(jwt({ secret: JWT_SECRET_KEY })
    .unless({ path: [
      /^\/api\/admins\/login$/,
      /^\/$/, /^\/mh/,
      /^\/css\//,
      /^\/js\//,
      /^\/img\//
    ] }));
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }));

loadRouters(module, './routes', {visit: (r)=>{
  app.use(r.routes());
}});

app.listen(8080);
