#!/usr/bin/env node

const mysql = require('mysql'),
      fs    = require('fs');

function installDB(id) {
  const sql   = fs.readFileSync('./install.sql').toString('utf8'),
        con   = mysql.createConnection({
          host: '192.168.133.144',
          multipleStatements: true,
          user: 'root',
          password: 'ddd'
        });

  return new Promise((resolve, reject) => {
    con.connect();
    con.query(sql, (err, result) => {
      if(err) reject();

      console.log(result);
      con.end();
      resolve();
    });
  });
}

installDB();
