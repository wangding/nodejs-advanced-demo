const router = require('koa-router')(),
      { seq, ResData } = require('../models/common'),
      { BookStatAreaView, BookView } = require('../models');
      //{ Book, Area, AuthorBook, Author } = require('../models');

router.prefix('/api/books');

/*
router.get('/', async (ctx, next) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  if(typeof page === 'undefined') {
    page  = 1;
    limit = 10;
  }

  let aus = await Book.findAll({
    limit:   Number(limit),
    offset:  (page-1) * limit,
    order:   [['id']],
    include: [ Area, { model: AuthorBook, include: [Author] }]
  });

  aus = aus.map((row) => {
    row.dataValues.area_name = row.dataValues.area.area_name;
    delete row.dataValues.area_id;
    delete row.dataValues.area;

    row.dataValues.summary = row.dataValues.summary.substr(0, 25);

    row.dataValues.authors = [];
    row.dataValues.author_books.forEach((au) => {
      row.dataValues.authors.push(au.author.author_name);
    });
    delete row.dataValues.author_books;

    return row;
  });

  const num = await Book.count();

  res.count = num;
  res.data  = aus;

  ctx.body  = res;
});

router.get('/stat-by-area', async(ctx, next) => {
  let res = new ResData();

  let aus = await Book.findAll({
    attributes: ['area_id', [seq.fn('COUNT', seq.col('book.id')), 'count']],
    group: 'area_id',
    include: [ Area ]
  });

  aus = aus.map((book) => {
    book.dataValues.area_name = book.dataValues.area.area_name;
    delete book.dataValues.area_id;
    delete book.dataValues.area;

    return book;
  });

  res.count = aus.length;
  res.data  = aus;

  ctx.body = res;
});
*/

router.get('/', async(ctx, next) => {
  let { page, limit } = ctx.query,
      res = new ResData();

  if(typeof page === 'undefined') {
    page  = 1;
    limit = 10;
  }

  let aus = await BookView.findAndCountAll({
    limit:   Number(limit),
    offset:  (page-1) * limit,
    order:   [['id']]
  });

  res.count = aus.count;
  res.data  = aus.rows;

  ctx.body  = res;
});

router.get('/stat-by-area', async(ctx, next) => {
  let res = new ResData();

  let aus = await BookStatAreaView.findAndCountAll();

  res.count = aus.count;
  res.data  = aus.rows;

  ctx.body  = res;
});

module.exports = router;
