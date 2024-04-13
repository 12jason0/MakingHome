const DataTypes = require('sequelize');

const IssueModel = (sequelize) => {
  return sequelize.define(
    'Issues',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      img1: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img2: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img3: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      body1: {
        type: DataTypes.STRING(255),
        // NULL 추가
      },
      body2: {
        type: DataTypes.STRING(255),
        // NULL 추가
      },
      body3: {
        type: DataTypes.STRING(255),
        // NULL 추가
      },
      body4: {
        type: DataTypes.STRING(255),
        // NULL 추가
      },
    },
    { timestamps: false }
  );
};

module.exports = IssueModel;
