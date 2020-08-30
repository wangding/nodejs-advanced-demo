const { seq } = require('./common'),
      { DataTypes } = require('sequelize');

const attributes = {
  tag_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
};

module.exports = seq.define('tag', attributes);
