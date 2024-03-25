const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api', (req, res) => {
  res.send({ message: 'hello' });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
