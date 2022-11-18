const express = require('express');
const logger = require('./middleware/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello! Welcome to Wen App Server');
});

function start(){
  app.listen(PORT, () => { console.log(`listing on port ${PORT}`); });
}

module.exports = { start, app };