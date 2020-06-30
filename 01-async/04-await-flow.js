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
      resolve();
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
      resolve();
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
        resolve();
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
      resolve();
    });
  });
}

/* ----------------------- */

/*
task(1);
fakeAsync(2);
readDir(3);
getPage(4);
task(5);

task(1);
fakeAsync(2)
  .then(() => { return readDir(3); })
  .then(() => { return getPage(4); })
  .then(() => { return task(5); });
*/

async function taskManager() {
  task(1);
  await fakeAsync(2);
  await readDir(3);
  await getPage(4);
  await readMysql(5);
  await fakeAsync(6);
  task(7);
}

taskManager();
