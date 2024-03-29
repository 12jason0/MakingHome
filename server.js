const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// body-parser
app.use(cors());
app.use(express.json());

// http://localhost:5000/login/
const apiRouter = require('./serverRoutes/apiRouter');
app.use('/api', apiRouter);
// http://localhost:5000/user/
const userRouter = require('./serverRoutes/userRouter');
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
