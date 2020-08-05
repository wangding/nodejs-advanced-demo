const mysql  = require('mysql2/promise'),
      { con, ResData } = require('./common'),
      log    = console.log;

async function getTagsInPage(page=1, limit=10) {
  let sql = `select * from tags order by id limit ${(page-1)*limit}, ${limit}`,
      res = new ResData();
  let sqlCount = 'select count(id) as num from tags';

  let [rows] = await con.execute(sql);
  res.data = rows;

  [rows] = await con.execute(sqlCount);
  res.count = rows[0].num;
  
  return res;
}

async function getTagsByName(tagName) {
  let sql = `select * from tags where tag_name like "%${tagName}%"`,
      res = new ResData();
  let [rows] = await con.execute(sql);

  res.data  = rows;
  res.count = rows.length;

  return res;
}

async function addTag(tagName) {
  let sql = `insert into tags(tag_name) values ("${tagName}")`,
      res = new ResData();
  try {
    let [rows] = await con.execute(sql);
    res.msg = rows.affectedRows === 1 ? '添加成功': '添加失败';
    return res;
  } catch(e) {
    res.code = 403001;
    res.msg  = '添加失败';
    return res;
  }
}

async function updateTagByID(id, tagName) {
  let sql = `update tags set tag_name = "${tagName}" where id = ${id}`,
      res = new ResData();

  try {
    let [rows] = await con.execute(sql);
    res.msg = rows.affectedRows === 1 ? '修改成功': '修改失败';
    return res;
  } catch(e) {
    res.code = 403002;
    res.msg  = '修改失败';
    return res;
  }
}

async function deleteTagByID(id) {
  let sql = `delete from tags where id = ${id}`,
      res = new ResData();

  try {
    let [rows] = await con.execute(sql);
    res.msg  = rows.affectedRows === 1 ? '删除成功' : '';
    return res;
  } catch(e) {
    res.code = 403003;
    res.msg  = '删除失败';
    return res;
  }
}

module.exports = {
  getTagsInPage,
  getTagsByName,
  addTag,
  updateTagByID,
  deleteTagByID
}
