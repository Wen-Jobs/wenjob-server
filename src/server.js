const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
require('dotenv').config();
const cron = require('node-cron');

const getNewJobs = require('./scraping/scheduledScraper');
let new_jobs = require('./scraping/scraped_data/NEW_JOBS');
let ALL_JOBS = require('./scraping/scraped_data/ALL_JOBS');

console.log('most recent', new_jobs[0].key);

// schedule method is used to schedule a task, takes in a string and a callback
// asterisk represent a unit of time seconds, minutes, hours (0-59), days (1-31), month (1-12), day of week (0-7)
cron.schedule('10 * * * *', () => {
  console.log('Hello World');
  getNewJobs();
  updateALLJOB();
});

const updateALLJOB = () => {
  let i = 0;
  const latest = ALL_JOBS[0].most_recent;
  console.log(latest, new_jobs[i].key);

  while(new_jobs[i].key !== latest){

    if(i === 0){
      ALL_JOBS[0].most_recent = new_jobs[i].key;
    }
    ALL_JOBS.push(new_jobs[i]);
    i++;
  }
  console.log(ALL_JOBS[0].most_recent);
  return ALL_JOBS;
}


const PORT = process.env.PORT || 3002;

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello! Welcome to Wen App Server');
});

app.get('/getJobs', (req, res, next) => {
  // console.log(ALL_JOBS.length);
  // console.log(ALL_JOBS[0]);
  res.send(ALL_JOBS);
});

app.get('/updateJobs', (req, res, next) => {
  ALL_JOBS = updateALLJOB();
  res.send(ALL_JOBS);
})

function start() {
  app.listen(PORT, () => { console.log(`listing on port ${PORT}`); });
};

module.exports = { start, app };
