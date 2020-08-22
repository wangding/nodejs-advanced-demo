const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      { ResData } = require('../models/common'),
      { Tag } = require('../models');

router.prefix('/api/tags')

router.get('/', async (ctx) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  if(typeof page === 'undefined') {
    page  = 1;
    limit = 10;
  }

  const aus = await Tag.findAndCountAll({
    limit:  Number(limit),
    offset: (page-1) * limit,
    order:  [['id']]
  });

  res.count = aus.count;
  res.data  = aus.rows;

  ctx.body  = res;
})

router.get('/:tagName', async (ctx) => {
  let { tagName } = ctx.params,
      res = new ResData();

  const aus = await Tag.findAndCountAll({
    where: { tag_name: { [Op.substring]: tagName }},
    order: [['id']]
  });

  if(aus.count === 0) {
    res.code = 40301;
    res.msg  = '查询失败：类别不存在！';
  } else {
    res.count = aus.count;
    res.data  = aus.rows;
  }

  ctx.body = res;
})

router.post('/', async (ctx) => {
  const { tagName } = ctx.request.body;
  let res = new ResData();

  const [ arr, re ] = await Tag.findOrCreate({
    where: { tag_name: tagName }
  });

  if(!re) {
    res.code = 40302;
    res.msg  = '插入失败：类别已存在！';
  }

  ctx.body = res;
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params,
        { tagName } = ctx.request.body;

  let res = new ResData();

  const [us] = await Tag.update({
    tag_name: tagName
  }, {
    where: { id }
  });

  if(us === 0) {
    res.code = 40303;
    res.msg  = '更新失败：类别不存在！';
  }

  ctx.body = res;
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params;
  let ids = id.split(','),
      res = new ResData();

  const num = await Tag.destroy({ where: { id: ids } });

  if(num === 0) {
    res.code = 40304;
    res.msg  = '删除失败：类别不存在！';
  }

  ctx.body = res;
});

module.exports = router;
