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
// db.Post = require('./post')(sequelize);
// db.Member = require('./member')(sequelize);
// db.Profile = require('./profile')(sequelize);
// db.Comment = require('./comment')(sequelize);
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
