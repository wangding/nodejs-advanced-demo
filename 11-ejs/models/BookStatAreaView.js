const { seq } = require('./common'),
      { DataTypes } = require('sequelize');

const attributes = {
  area_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
};

module.exports = seq.define('book_stat_area_view', attributes);
