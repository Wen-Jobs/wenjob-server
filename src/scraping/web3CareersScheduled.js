'use strict';

const getWeb3CareersMostRecent = require('./web3CareersMostRecent');
const web3CareersScraper = require('./web3CareersScraper');
const zipWeb3Careers = require('./zipWeb3Careers');
const addToDatabase = require('./addToDatabase');

const web3CareersScheduled = async () => {
  // get the key of the most recent job from the database
  let mostRecent = await getWeb3CareersMostRecent();
  // scrape the first page of web3.careers
  let firstPageRawData = await web3CareersScraper(1);
  // zip the raw data into an array of objects
  let jobsData = zipWeb3Careers(firstPageRawData);
  // add the new jobs to the database
  let i = 0;
  while (jobsData[i].key !== mostRecent) {
    addToDatabase(jobsData[i]);
    i++;
  }
};

module.exports = web3CareersScheduled;
