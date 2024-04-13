const { DataTypes } = require('sequelize');

// BucketModel 테이블 속성: id(pk) + userId(외래키) + musicId(외래키)
const BucketModel = (sequelize) => {
  return sequelize.define('bucket', {}, { timestamps: false });
};

module.exports = BucketModel;
