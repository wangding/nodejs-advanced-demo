const mysql  = require('mysql2/promise'),
      { con, ResData } = require('./common'),
      log    = console.log;

async function getBooksInPage(page=1, limit=10) {
  let res = new ResData();
  let sql = '' 
    + 'select bk.id, bk.unique_id, bk.book_name, bk.area_name, group_concat(bk.author_name separator ", ") as author_name '
    + 'from ( '
      + 'select b.id, ar.area_name, unique_id, book_name, a.author_name '
      + 'from books as b '
      + 'join author_books as ab '
      + 'on b.id = ab.book_id '
      + 'join authors as a '
      + 'on ab.author_id = a.id '
      + 'join areas as ar '
      + 'on b.area_id = ar.id) as bk '
    + ' group by bk.id '
    + 'order by bk.id '
    + `limit ${(page-1)*limit}, ${limit}`;

  let sqlCount = 'select count(id) as num from books';

  let [rows] = await con.execute(sql);
  res.data = rows;

  [rows] = await con.execute(sqlCount);
  res.count = rows[0].num;
  
  return res;
}

module.exports = {
  getBooksInPage
}
