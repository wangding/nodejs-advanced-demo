#!/usr/bin/env node

/* 
 * ok:            ./app.js wd 123
 * fail:          ./app.js abc abc
 * injection:     ./app.js '" OR 1=1 -- ' abc
 * injection:     ./app.js '" OR 1=1 #' abc
 */

const mysql = require('mysql2/promise'),
      log = console.log;

const userName = process.argv[2],
      pwd = process.argv[3];

if(process.argv.length !== 4) {
  log('usage: cmd userName password');
  process.exit(1);
}

async function select() {
  const con = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'ddd'
  });

  const sql = 'select * from si.users where name = "' + userName +'" and pwd = "' + pwd + '";';
  log('SQL:\t', sql);

  const [rows, fields] = await con.execute(sql);

  log('ROWS:\t', rows);
  con.end();
}

select();
