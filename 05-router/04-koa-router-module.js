#!/usr/bin/env node

const Koa     = require('koa'),
      bodyparser = require('koa-bodyparser'),
      authors = require('./routes/authors');

const app     = new Koa();

app.use(bodyparser({ enableTypes: ['json', 'form', 'text'] }))

app.use(authors.routes())

app.listen(8080);
