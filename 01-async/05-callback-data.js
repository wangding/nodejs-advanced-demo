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

function fakeAsync(id, next) {
  const start = Date.now(),
        delay = Math.random() * 1000;

  setTimeout(function() {
    const end = Date.now();
    log('fakeAsync use %dms', end-start);
    report(id, end-start);
    //return end-start;
    if(typeof next === 'function') next(end-start);
  }, delay);
}

function readDir(id, next) {
  const start = Date.now(),
        fs    = require('fs');

  fs.readdir(process.cwd(), (err, files) => {
    log(files);

    const end = Date.now();
    report(id, end-start);
    if(typeof next === 'function') next(files);
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
      if(typeof next === 'function') next(data);
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
    if(typeof next === 'function') next(result);
  });
}

/* ----------------------- */

/*
task(1);
var data = fakeAsync(2);
log(data);
task(3);
*/

task(1);
fakeAsync(2, (data)=>{     // callback hell
  log('GET-DATA:', data);
  readDir(3, (data) => {
    log('GET-DATA:', data);
    getPage(4, (data) => {
      log('GET-DATA:', data);
      readMysql(5, (data) => {
        log('GET-DATA:', data);
        fakeAsync(6, (data) => {
          log('GET-DATA:', data);
          task(7);
        });
      });
    });
  });
});
