'use strict';

const puppeteer = require('puppeteer');
const addToDatabase = require('./addToDatabase');
const Web3CareersScraper = require('./web3CareersScraper');
const zipWeb3Careers = require('./zipWeb3Careers');

let bigScraper = async (numPages) => {

  // launch the browser
  console.log('Opening browser...');
  const browser = await puppeteer.launch();

  // open a new page or 'tab' in the browser
  console.log('Opening new page...');
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
  jobsData.forEach(job => {
    console.log(job);
  });

  console.log('Closing browser...');
  await browser.close();
};

// pass in the number of pages to scrape
// bigScraper(1);
