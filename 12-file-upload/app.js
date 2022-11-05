const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const {koaBody} = require('koa-body')
const {join} = require('path')
const logger = require('koa-logger')

const index = require('./routes/index')

// error handler
onerror(app)

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: join(__dirname, 'public/upload/'),
    keepExtensions: true
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
