#!/usr/bin/env node

const log = console.log;

console.time('ALL TASKS USE');

function report(id, cost) {
  log(`#${id} task done. use ${cost} ms.\n`);
}

process.on('exit', () => {
  console.timeEnd('ALL TASKS USE');
});

function task(id) {
  const start = Date.now();

  log('empty task.');

  const end = Date.now();
  report(id, end-start);
}

/*
function fakeAsync(id) {
  const start = Date.now(),
        delay = Math.random() * 1000;

  setTimeout(function() {
    const end = Date.now();
    log('fakeAsync use %dms', end-start);
    report(id, end-start);
    task(id+1);      // method 1
  }, delay);
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
    if(typeof next === 'function') next();
  }, delay);
}

function readDir(id, next) {
  const start = Date.now(),
        fs    = require('fs');

  fs.readdir(process.cwd(), (err, files) => {
    log(files);

    const end = Date.now();
    report(id, end-start);
    if(typeof next === 'function') next();
  });
}

function getPage(id, next) {
  const start = Date.now(),
        http  = require('https'),
        addr  = 'https://sample.wangding.in/web/one-div.html';

  http.get(addr, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      log(data);

      const end = Date.now();
      report(id, end-start);
      if(typeof next === 'function') next();
    });
  });
}

function readMysql(id, next) {
  const mysql = require('mysql'),
        sql   = 'show databases;',
        start = Date.now();
        con   = mysql.createConnection({
          host: '127.0.0.1',
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
    if(typeof next === 'function') next();
  });
}

/* ----------------------- */

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
