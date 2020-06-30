#!/usr/bin/env node

const log = console.log;

function report(id, cost) {
  log(`#${id} task done. use ${cost} ms.\n`);
}

function task(id) {
  const start = Date.now();

  log('empty task.');

  const end = Date.now();
  report(id, end-start);
}

function fakeAsync(id) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const end = Date.now();
      log('fakeAsync use %dms', end-start);
      report(id, end-start);
      resolve(end-start);
    }, 100);
  });
}

function readDir(id) {
  const start = Date.now(),
        fs    = require('fs');

  return new Promise((resolve, reject) => {
    fs.readdir(process.cwd(), (err, files) => {
      if(err) reject();

      log(files);

      const end = Date.now();
      report(id, end-start);
      resolve(files);
    });
  });
}

function getPage(id) {
  const start = Date.now(),
        http  = require('http'),
        addr  = 'http://sample.wangding.in/web/one-div.html';

  return new Promise((resolve, reject) => {
    http.get(addr, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        log(data);

        const end = Date.now();
        report(id, end-start);
        resolve(data);
      });
    });
  });
}

function readMysql(id) {
  const mysql = require('mysql'),
        sql   = 'show databases;',
        start = Date.now();
        con   = mysql.createConnection({
          host: '192.168.133.144',
          user: 'root',
          password: 'ddd',
          database: 'mysql'
        });

  return new Promise((resolve, reject) => {
    con.connect();
    con.query(sql, (err, result) => {
      if(err) reject();

      log('Database');
      log('------------------');
      result.forEach((row) => { log(row.Database); });
      log('------------------');
      con.end();
 
      const end = Date.now();
      report(id, end-start);
      resolve(result);
    });
  });
}
/* ----------------------- */

/*
task(1);
fakeAsync(2)
  .then((val) => { log('get Data:', val); return readDir(3); })
  .then((val) => { log('get Data:', val); return getPage(4); })
  .then((val) => { log('get Data:', val); return readMysql(5); })
  .then((val) => { log('get Data:', val); return task(6); });
*/

async function taskManager() {
  task(1);

  log('getData:', await fakeAsync(2));
  log('getData:', await readDir(3));
  log('getData:', await getPage(4));
  log('getData:', await readMysql(5));

  task(6);
}

taskManager();
