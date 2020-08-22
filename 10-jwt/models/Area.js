const { seq } = require('./common'),
      { DataTypes } = require('sequelize');

const attributes = {
  area_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
};

module.exports = seq.define('area', attributes);
