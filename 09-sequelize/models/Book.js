const { seq } = require('./common'),
      { DataTypes } = require('sequelize');

const attributes = {
  unique_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '漫画拼音名称标识'
  },
  book_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_time: {
    type: DataTypes.STRING,
    defaultValue: '',
    comment: '最后更新时间'
  },
  tags: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  summary: {
    type: DataTypes.TEXT,
  },
  end: {
    type: DataTypes.INTEGER(4),
    defaultValue: 0,
    comment: '0 为连载，1 为完结'
  },
  area_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '漫画所属地区'
  },
  is_top: {
    type: DataTypes.INTEGER(4),
    allowNull: false,
    comment: '是否推荐'
  }
};

module.exports = seq.define('book', attributes);
