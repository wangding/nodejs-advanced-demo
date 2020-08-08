#!/usr/bin/env node

const Koa    = require('koa'),
      bodyparser = require('koa-bodyparser'),
      /*
      authors = require('./routes/authors'),
      tags   = require('./routes/tags'),
      areas  = require('./routes/areas'),
      */
      loadRouters = require('require-directory');

const app    = new Koa();

/*
app.use(authors.routes());
app.use(areas.routes());
app.use(tags.routes());
*/
app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))

loadRouters(module, './routes', {visit: (r)=>{
  app.use(r.routes());
}});

app.listen(8080);
