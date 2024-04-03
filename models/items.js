const DataTypes = require('sequelize');

// 단수형태 지정해주지 않으면 테이블 복수형태로 생성됨 : members
const ItemModel = (sequelize) => {
  return sequelize.define(
    'items',
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
        type: DataTypes.STRING(255),
        // NULL 추가
      },
      delivery: {
        type: DataTypes.STRING(255),
        // NULL 추가해야됨
      },
      review: {
        type: DataTypes.INTEGER,
      },
      chart: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};

module.exports = ItemModel;
