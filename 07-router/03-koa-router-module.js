#!/usr/bin/env node

const Koa    = require('koa'),
      logger = require('koa-logger'),
      notFound = require('./middleware/404');

const blogs  = require('./routes/blogs'),
      users  = require('./routes/users'),
      index  = require('./routes/index');

const app    = new Koa();

app.use(logger())
   .use(notFound);

app.use(blogs.routes())
   .use(users.routes())
   .use(index.routes());

app.listen(8080);
