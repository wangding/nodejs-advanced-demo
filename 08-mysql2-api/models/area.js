const mysql  = require('mysql2/promise'),
      { con, ResData } = require('./common');

async function getAreasInPage(page=1, limit=10) {
  let sql = `select * from areas order by id limit ${(page-1)*limit}, ${limit}`,
      res = new ResData();
  let sqlCount = 'select count(id) as num from areas';

  let [rows] = await con.execute(sql);
  res.data = rows;

  [rows] = await con.execute(sqlCount);
  res.count = rows[0].num;
  
  return res;
}

async function getAreasByName(areaName) {
  let sql = `select * from areas where area_name like "%${areaName}%"`,
      res = new ResData();
  let [rows] = await con.execute(sql);

  res.data  = rows;
  res.count = rows.length;

  return res;
}

async function addArea(areaName) {
  let sql = `insert into areas(area_name) values ("${areaName}")`,
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

async function updateAreaByID(id, areaName) {
  let sql = `update areas set area_name = "${areaName}" where id = ${id}`,
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

async function deleteAreaByID(id) {
  let sql = `delete from areas where id = ${id}`,
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
  getAreasInPage,
  getAreasByName,
  addArea,
  updateAreaByID,
  deleteAreaByID
}
