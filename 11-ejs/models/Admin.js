const { seq } = require('./common'),
      { DataTypes } = require('sequelize');

const attributes = {
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_login_time: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  last_login_ip: {
    type: DataTypes.STRING,
    defaultValue: '' 
  }
};

module.exports = seq.define('admin', attributes);
