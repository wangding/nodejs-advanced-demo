const Sequelize = require('sequelize');

const seq = new Sequelize('demo', 'root', 'ddd', {
  host: 'localhost',
  dialect: 'mysql',
  define: { timestamps: false }
});

class ResData {
  constructor() {
    this.code = 0;
    this.msg  = 'ok';
    this.count= 0;
    this.data = '';
  }
};

module.exports = { seq, ResData };
