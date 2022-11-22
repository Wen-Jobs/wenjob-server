const express = require('express');
const cors = require('cors');
const redis = require('redis');
const logger = require('./middleware/logger');
const fs = require('fs');
require('dotenv').config();
const cron = require('node-cron');

const getNewJobs = require('./scraping/scheduledScraper');
const new_jobs = require('./scraping/scraped_data/NEW_JOBS');
const ALL_JOBS = require('./scraping/scraped_data/ALL_JOBS');

// schedule method is used to schedule a task, takes in a string and a callback
// asterisk represent a unit of time seconds, minutes, hours (0-59), days (1-31), month (1-12), day of week (0-7)
// cron.schedule('*/1 * * * *', () => {
//   console.log('Hello World');
//   getNewJobs();
// });

//   // uses most recent key and compares with most recent new job key
//   if(ALL_JOBS.most_recent !== new_jobs[0].key){
//     let i = 0;
//     while(new_jobs[i].key !== ALL_JOBS[0].most_recent){
//       console.log(new_jobs[i].key, ALL_JOBS[0].most_recent);
//       console.log(new_jobs[0].key !== ALL_JOBS.most_recent);

//       if(i === 0){
//         console.log('new jobs added!');
//         ALL_JOBS[0] = {most_recent: new_jobs[i].key};
//       }
//       ALL_JOBS.push(new_jobs[i]);
//       i++;
//     }
//     console.log(ALL_JOBS.length);
//   }


const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello! Welcome to Wen App Server');
});

app.get('/getJobs', (req, res, next) => {
  console.log(ALL_JOBS.length);
  res.send(ALL_JOBS);
});

app.get('/updateJobs', (req, res, next) => {

})

function start() {
  app.listen(PORT, () => { console.log(`listing on port ${PORT}`); });
};

module.exports = { start, app };
