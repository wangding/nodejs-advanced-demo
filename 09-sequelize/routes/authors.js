const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      { ResData } = require('../models/common'),
      { Author } = require('../models');

router.prefix('/api/authors')

router.get('/', async (ctx) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  if(typeof page === 'undefined') {
    page  = 1;
    limit = 10;
  }

  const aus = await Author.findAndCountAll({
    limit:  Number(limit),
    offset: (page-1) * limit,
    order:  [['id']]
  });

  res.count = aus.count;
  res.data  = aus.rows;


  ctx.body  = res;
})

router.get('/:authorName', async (ctx) => {
  let { authorName } = ctx.params,
      res = new ResData();

  const aus = await Author.findAndCountAll({
    where: { author_name: { [Op.substring]: authorName }},
    order: [['id']]
  });

  if(aus.count === 0) {
    res.code = 40101;
    res.msg  = '查询失败：作者不存在！';
  } else {
    res.count = aus.count;
    res.data  = aus.rows;
  }

  ctx.body = res;
})

router.post('/', async (ctx) => {
  const { authorName } = ctx.request.body;
  let res = new ResData();

  const [ arr, re ] = await Author.findOrCreate({
    where: { author_name: authorName }
  })

  if(!re) {
    res.code = 40102;
    res.msg  = '插入失败：作者已存在！';
  }

  ctx.body = res;
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params,
        { authorName } = ctx.request.body;

  let res = new ResData();

  const [us] = await Author.update({
    author_name: authorName
  }, { where: { id } })

  if(us === 0) {
    res.code = 40103;
    res.msg  = '更新失败：作者不存在！';
  }

  ctx.body = res;
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params;
  let ids = id.split(','),
      res = new ResData();

  const num = await Author.destroy({ where: { id: { [Op.in]: ids } } });

  if(num === 0) {
    res.code = 40104;
    res.msg  = '删除失败：作者不存在！';
  }

  ctx.body = res;
});

module.exports = router;
