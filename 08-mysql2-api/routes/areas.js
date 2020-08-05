const router = require('koa-router')(),
      {area} = require('../models'),
      log    = console.log;

router.prefix('/api/areas');

router.get('/', async (ctx, next) => {
  var { page, limit } = ctx.query;

  ctx.body = await area.getAreasInPage(page, limit);
});

router.get('/:areaName', async (ctx, next) => {
  var { areaName } = ctx.params;

  ctx.body = await area.getAreasByName(areaName);
});

router.post('/', async (ctx, next) => {
  var { areaName } = ctx.request.body;

  ctx.body = await area.addArea(areaName);
});

router.put('/:id', async (ctx, next) => {
  var { id } = ctx.params;
  var { areaName } = ctx.request.body;

  ctx.body = await area.updateAreaByID(id, areaName);
});

router.delete('/:id', async (ctx, next) => {
  var { id } = ctx.params;

  ctx.body = await area.deleteAreaByID(id);
});

module.exports = router;
