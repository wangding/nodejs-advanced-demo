const mysql  = require('mysql2/promise'),
      { con, ResData } = require('./common');

async function getAuthorsInPage(page=1, limit=10) {
  let sql = `select * from authors order by id limit ${(page-1)*limit}, ${limit}`,
      res = new ResData();
  let sqlCount = 'select count(id) as num from authors';

  var [rows] = await con.execute(sql);
  res.data = rows;

  [rows] = await con.execute(sqlCount);
  res.count = rows[0].num;
  
  return res;
}

async function getAuthorsByName(authorName) {
  let sql = `select * from authors where author_name like "%${authorName}%"`,
      res = new ResData();
  var [rows] = await con.execute(sql);

  res.data  = rows;
  res.count = rows.length;

  return res;
}

async function addAuthor(authorName) {
  let sql = `insert into authors(author_name) values ("${authorName}")`,
      res = new ResData();
  try {
    var [rows] = await con.execute(sql);
    res.msg = rows.affectedRows === 1 ? '添加成功': '添加失败';
    return res;
  } catch(e) {
    res.code = 402001;
    res.msg  = '添加失败';
    return res;
  }
}

async function updateAuthorByID(id, authorName) {
  let sql = `update authors set author_name = "${authorName}" where id = ${id}`,
      res = new ResData();

  try {
    var [rows] = await con.execute(sql);
    res.msg = rows.affectedRows === 1 ? '修改成功': '修改失败';
    return res;
  } catch(e) {
    res.code = 402002;
    res.msg  = '修改失败';
    return res;
  }
}

async function deleteAuthorByID(id) {
  let sql = `delete from authors where id = ${id}`,
      res = new ResData();

  try {
    var [rows] = await con.execute(sql);
    res.msg  = rows.affectedRows === 1 ? '删除成功' : '';
    return res;
  } catch(e) {
    res.code = 402003;
    res.msg  = '删除失败';
    return res;
  }
}

module.exports = {
  getAuthorsInPage,
  getAuthorsByName,
  addAuthor,
  updateAuthorByID,
  deleteAuthorByID
}
