const router = require('koa-router')()
const fs = require('fs')
const {join} = require('path')

router.get('/', async (ctx) => {
  const pictures = fs.readdirSync(join(__dirname, '../public/upload'));
  await ctx.render('index', { pictures })
})

router.post('/upload', async (ctx) => {
  ctx.body = 'ok!'
})

module.exports = router
