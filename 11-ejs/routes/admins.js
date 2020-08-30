const router  = require('koa-router')(),
      jwt     = require('jsonwebtoken'),
      Op      = require('sequelize').Op,
      { JWT_SECRET_KEY, ADMIN_EXPIRES } = require('../conf/constant'),
      { getUserInfo, cryptoPwd } = require('../service/admins'),
      { ResData } = require('../models/common'),
      { Admin } = require('../models');

router.prefix('/api/admins')

router.get('/', async (ctx) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  if(typeof page === 'undefined') {
    page = 1;
    limit = 10;
  }

  const aus = await Admin.findAndCountAll({
    limit:  Number(limit),
    offset: (page-1) * limit,
    order:  [['id']]
  });

  res.count = aus.count;
  res.data  = aus.rows;

  let usr   = await getUserInfo(ctx);
  console.log(usr);

  ctx.body  = res;
})

router.get('/:userName', async (ctx) => {
  let { userName } = ctx.params,
      res = new ResData();

  const aus = await Admin.findAndCountAll({
    where: { user_name: { [Op.substring]: userName }},
    order: [['id']]
  });

  if(aus.count === 0) {
    res.code = 40501;
    res.msg  = '查询失败：管理员不存在！';
  } else {
    res.count = aus.count;
    res.data  = aus.rows;
  }

  ctx.body = res;
})

router.post('/login', async (ctx) => {
  const { userName, password } = ctx.request.body;
  let res = new ResData();

  const aus = await Admin.findAll({
    where: { user_name: userName }
  })

  if(aus.length === 0) {
    res.code = 40502;
    res.msg  = '登录失败：管理员不存在！';
  } else if(aus[0].password !== cryptoPwd(password)){
    res.code = 40503;
    res.msg  = '登录失败：密码不正确！';
  } else {
    res.data = jwt.sign(aus[0].dataValues, JWT_SECRET_KEY, { expiresIn: ADMIN_EXPIRES });
  }

  ctx.body = res;
})

router.post('/', async (ctx) => {
  const { userName, password } = ctx.request.body;
  let res = new ResData();

  const [ arr, re ] = await Admin.findOrCreate({
    where: { user_name: userName },
    defaults: { user_name: userName, password: cryptoPwd(password) }
  });

  if(!re) {
    res.code = 40502;
    res.msg  = '插入失败：管理员已存在！';
  }

  ctx.body = res;
})

router.put('/:id', async (ctx) => {
  const { id } = ctx.params,
        { userName, password } = ctx.request.body;

  let res = new ResData();

  const [us] = await Admin.update({
    user_name: userName,
    password:  cryptoPwd(password)
  }, {
    where: { id }
  });

  if(us === 0) {
    res.code = 40503;
    res.msg  = '更新失败：管理员不存在！';
  }

  ctx.body = res;
})

router.del('/:id', async (ctx) => {
  let { id } = ctx.params;
  let ids = id.split(','),
      res = new ResData();

  const num = await Admin.destroy({ where: { id: ids } } );

  if(num === 0) {
    res.code = 40504;
    res.msg  = '删除失败：管理员不存在！';
  }

  ctx.body = res;
});

module.exports = router;
