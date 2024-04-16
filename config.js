require('dotenv').config(); // 환경변수 사용
module.exports = {
  development: {
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.production.NAME,
    password: process.env.production.PASSWORD,
    database: process.env.production.DATABASE,
    host: process.env.production.HOST,
    dialect: 'mysql',
    port: process.env.production.PORT,
  },
};
