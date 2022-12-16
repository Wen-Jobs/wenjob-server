'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const cron = require('node-cron');
const web3CareersScheduled = require('./scraping/web3.career/web3CareersScheduled');

// schedule method is used to schedule a task, takes in a string and a callback
// asterisk represent a unit of time seconds (0-59 optional), minutes(0-59), hours (0-23), days (1-31), month (1-12), day of week (0-7)

// scrapes data every 12 hours
const dailyScraper = cron.schedule(' * */12 * * *', () => {
  web3CareersScheduled();
});

dailyScraper.start();

function start() {
  app.listen(PORT, () => { console.log(`Listening On Port: ${PORT}`); });
}

module.exports = { start, app };
