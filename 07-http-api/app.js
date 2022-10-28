#!/usr/bin/env node

const Koa    = require('koa'),
      bodyparser = require('koa-bodyparser'),
      cors = require('koa2-cors'),
      loadRouters = require('require-directory');

const app    = new Koa();

app.use(cors());
app.use(bodyparser({ enableTypes: ['json', 'form', 'text']  }));
loadRouters(module, './routes', {visit: (r)=>{
  app.use(r.routes());
}});

app.listen(8080);
