'use strict';

const puppeteer = require('puppeteer');
const addToDatabase = require('../utils/addToDatabase');
const Web3CareersScraper = require('./web3CareersScraper');
const zipWeb3Careers = require('./zipWeb3Careers');

let bigScraper = async (numPages) => {

  // launch the browser
  console.log('------------------------------------');
  console.log('Opening Browser...');
  const browser = await puppeteer.launch();

  // open a new page or 'tab' in the browser
  console.log('Opening New Page...');
  const page = await browser.newPage();

  // get raw data from web3.careers
  let rawJobData = await Web3CareersScraper(page, numPages);

  // zip the raw data into an array of objects
  let jobsData = zipWeb3Careers(rawJobData);


  // add the new jobs to the database
  // jobsData.forEach(job => {
  //   addToDatabase(job);
  // });

  console.log('Logging Data...');
  // jobsData.forEach(job => {
  //   console.log(job);
  // });
  console.log(jobsData.length);

  console.log('Closing Browser...');
  await browser.close();
  console.log('Browser Closed.');
  console.log('------------------------------------');

};

// pass in the number of pages to scrape
// bigScraper(1);
module.exports = bigScraper;
