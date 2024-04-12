const { DataTypes } = require('sequelize');

// List 테이블 속성: id(pk) + userId(외래키) + musicId(외래키)
const UserLikeModel = (sequelize) => {
  return sequelize.define('userlike', {}, { timestamps: false });
};

module.exports = UserLikeModel;
