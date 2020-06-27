#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('koa-logger'),
      loadRouters = require('require-directory'),
      notFound = require('./middleware/404');

const app    = new Koa();

app.use(logger())
   .use(notFound);

//var routes = requireDirectory(module, './routes');
loadRouters(module, './routes', {visit: (r)=>{
  //console.dir(r);
  app.use(r.routes());
}});

/*
//console.log(modules);
for(let m in routes) {
  //console.dir(routes[m]);
  if(routes[m] instanceof Router) {
    app.use(routes[m].routes());
  }
}
*/

app.listen(8080);
