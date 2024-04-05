const DataTypes = require('sequelize');

// 단수형태 지정해주지 않으면 테이블 복수형태로 생성됨 : members
const ItemChartModel = (sequelize) => {
  return sequelize.define(
    'itemChart',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      body: {
        type: DataTypes.STRING(255),
        // NULL 추가
      },
      sale: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      delivery: {
        type: DataTypes.STRING(255),
      },
      review: {
        type: DataTypes.INTEGER,
      },
      chartbar: {
        type: DataTypes.STRING(255),
      },
      chart: {
        type: DataTypes.INTEGER,
      },
      category1: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category2: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = ItemChartModel;
