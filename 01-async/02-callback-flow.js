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

/*
function fakeAsync(id) {
  const start = Date.now();
  setTimeout(function() {
    const end = Date.now();
    log('fakeAsync use %dms', end-start);
    report(id, end-start);
    task(id+1);      // method 1
  }, 100);
}
*/

// method 2
function fakeAsync(id, next) {
  const start = Date.now(),
        delay = Math.random() * 1000;

  setTimeout(function() {
    const end = Date.now();
    log('fakeAsync use %dms', end-start);
    report(id, end-start);
    next();
  }, delay);
}

function readDir(id, next) {
  const start = Date.now(),
        fs    = require('fs');

  fs.readdir(process.cwd(), (err, files) => {
    log(files);

    const end = Date.now();
    report(id, end-start);
    next();
  });
}

function getPage(id, next) {
  const start = Date.now(),
        http  = require('http'),
        addr  = 'http://sample.wangding.in/web/one-div.html';

  http.get(addr, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      log(data);

      const end = Date.now();
      report(id, end-start);
      next();
    });
  });
}

function readMysql(id, next) {
  const mysql = require('mysql'),
        sql   = 'show databases;',
        start = Date.now();
        con   = mysql.createConnection({
          host: '192.168.133.144',
          user: 'root',
          password: 'ddd',
          database: 'mysql'
        });

  con.connect();
  con.query(sql, (err, result) => {
    log('Database');
    log('------------------');
    result.forEach((row) => { log(row.Database); });
    log('------------------');
    con.end();

    const end = Date.now();
    report(id, end-start);
    next();
  });
}

/* ----------------------- */

//task(1);
//fakeAsync(2, task);

task(1);
fakeAsync(2, ()=>{     // callback hell
  readDir(3, () => {
    getPage(4, () => {
      readMysql(5, () => {
        fakeAsync(6, () => {
         task(7);
        });
      });
    });
  });
});
