// require('dotenv').config(); // 환경변수 사용
require('dotenv').config({ path: '.env.production' }); // 환경변수 사용
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
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: 'mysql',
    port: process.env.PORT,
  },
};
