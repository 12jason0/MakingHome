const express = require('express');
const db = require('./models');
const cors = require('cors');
const app = express();
const PORT = 5000;

console.log(process.env);

// body-parser
app.use(cors());
app.use(express.json());

// http://localhost:5000/api/
const apiRouter = require('./serverRoutes/apiRouter');
app.use('/api', apiRouter);
// http://localhost:5000/user/
const userRouter = require('./serverRoutes/userRouter');
app.use('/user', userRouter);
// http://localhost:5000/user/
const itemRouter = require('./serverRoutes/itemRouter');
app.use('/api/item', itemRouter);

// true : DB 초기화
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
//   });
// });

db.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
});
