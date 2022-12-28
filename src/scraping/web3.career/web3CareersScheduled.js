'use strict';

const puppeteer = require('puppeteer');

const getWeb3CareersMostRecent = require('./web3CareersMostRecent');
const web3CareersScraper = require('./web3CareersScraper');
const zipWeb3Careers = require('./zipWeb3Careers');
const addToDatabase = require('../utils/addToDatabase');

const web3CareersScheduled = async () => {
  console.log('------------------------------------');
  // launch the browser
  console.log('Opening Browser...');
  const browser = await puppeteer.launch();
  // open a new page or 'tab' in the browser
  console.log('Opening New Page...');
  const page = await browser.newPage();
  // get the key of the most recent job from the database
  let mostRecent = await getWeb3CareersMostRecent();
  // scrape the first page of web3.careers
  let firstPageRawData = await web3CareersScraper(page, 1);
  // zip the raw data into an array of objects
  let jobsData = await zipWeb3Careers(firstPageRawData);
  // add the new jobs to the database
  console.log('Adding New Jobs to Database...');
  for (let job of jobsData) {
    if (job.key === mostRecent) {
      break;
    }
    try {
      await addToDatabase(job);
    } catch (error) {
      console.log('Error:', error);
    }
  }
  // close the browser
  console.log('Closing Browser...');
  await browser.close();
  console.log('Browser Closed.');
  console.log('------------------------------------');
  process.exit();
};

web3CareersScheduled();

module.exports = web3CareersScheduled;
