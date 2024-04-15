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
      img4: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img5: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img6: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img7: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      img8: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
};

module.exports = IssueModel;
