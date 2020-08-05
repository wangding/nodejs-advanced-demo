const mysql  = require('mysql2/promise');

var con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'ddd',
  database: 'demo'
});

class ResData {
  constructor() {
    this.code = 0;
    this.msg  = 'ok';
    this.count= 0;
    this.data = '';
  }
};

module.exports = { con, ResData };
