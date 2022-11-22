const express = require('express');
const redis = require('redis');
const logger = require('./middleware/logger');
const fs = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(logger);

// FS library to read all of job listings
fs.readFile('./scraping/scraped_data/wenjobs_Page_1.json', 'utf8', (err, jsonString) => {
  if(err){
    console.log('File Read Failed!!!', err);
    return;
  } else {
    console.log('File Data', JSON.parse(jsonString));
  }
});

// let redisClient;

// // anon self invoked (iffy) fn to run immediately
// (async () => {
//   // invoke redis method to create redis instance
//   redisClient = redis.createClient();

//   // registers events on redis instance, takes error and callback as args to handles redis errors when it occurs
//   redisClient.on('error', (err) => console.log('Redis Client Error', err));

//   // starts connection with Redis on default port, return a promise
//   await redisClient.connect();
// })();

// let isCached = false;

app.get('/', (req, res) => {
  res.send('Hello! Welcome to Wen App Server');
});

function start(){
  app.listen(PORT, () => { console.log(`listing on port ${PORT}`); });
}

module.exports = { start, app };
