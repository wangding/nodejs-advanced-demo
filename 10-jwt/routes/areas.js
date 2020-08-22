const router  = require('koa-router')(),
      Op      = require('sequelize').Op,
      { ResData } = require('../models/common'),
      { Area } = require('../models');

router.prefix('/api/areas')

router.get('/', async (ctx) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  if(typeof page === 'undefined') {
    page = 1;
    limit = 10;
  }

  const aus = await Area.findAndCountAll({
    limit:  Number(limit),
    offset: (page-1) * limit,
    order:  [['id']]
  });

  res.count = aus.count;
  res.data  = aus.rows;

  ctx.body  = res;
})

router.get('/:areaName', async (ctx) => {
  let { areaName } = ctx.params,
      res = new ResData();

  const aus = await Area.findAndCountAll({
    where: { area_name: { [Op.substring]: areaName }},
    order: [['id']]
  });

  if(aus.count === 0) {
    res.code = 40201;
    res.msg  = '查询失败：地区不存在！';
  } else {
    res.count = aus.count;
    res.data  = aus.rows;
  }

  ctx.body = res;
})

router.post('/', async (ctx) => {
  const { areaName } = ctx.request.body;
  let res = new ResData();

  const [ arr, re ] = await Area.findOrCreate({
    where: { area_name: areaName }
  })

  if(!re) {
    res.code = 40202;
    res.msg  = '插入失败：地区已存在！';
  }

  ctx.body = res;
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params,
        { areaName } = ctx.request.body;

  let res = new ResData();

  const [us] = await Area.update({
    area_name: areaName
  }, {
    where: { id }
  });

  if(us === 0) {
    res.code = 40203;
    res.msg  = '更新失败：地区不存在！';
  }

  ctx.body = res;
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params;
  let ids = id.split(','),
      res = new ResData();

  const num = await Area.destroy({ where: { id: ids } } );

  if(num === 0) {
    res.code = 40204;
    res.msg  = '删除失败：地区不存在！';
  }

  ctx.body = res;
});

module.exports = router;
