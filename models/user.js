const DataTypes = require('sequelize');

// 단수형태 지정해주지 않으면 테이블 복수형태로 생성됨 : members
const UserModel = (sequelize) => {
  return sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      userPw: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );
};

module.exports = UserModel;
