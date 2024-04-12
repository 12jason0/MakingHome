'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
console.log(sequelize);
//모델
db.User = require('./user')(sequelize);
db.UserProfile = require('./userProfile')(sequelize);
db.Items = require('./items')(sequelize);
db.ItemGift = require('./Gift')(sequelize);
db.ItemChart = require('./itemChart')(sequelize);
db.UserLike = require('./userLike')(sequelize);

// 유저 찜목록 관계 db
db.User.hasOne(db.UserLike, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.UserLike.belongsTo(db.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
db.Items.hasOne(db.UserLike, { foreignKey: 'itemId', onDelete: 'CASCADE' });
db.UserLike.belongsTo(db.Items, { foreignKey: 'itemId', onDelete: 'CASCADE' });

// 1:1 관계
// db.Member.hasOne(db.Profile, { foreignKey: 'id', onDelete: 'CASCADE' });
// db.Profile.belongsTo(db.Member, {
//   foreignKey: 'memberId',
//   onDelete: 'CASCADE',
// });

// 1:다
// db.Post.hasMany(db.Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
// db.Comment.belongsTo(db.Post, { foreignKey: 'postId', onDelete: 'CASCADE' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
