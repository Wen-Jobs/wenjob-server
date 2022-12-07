'use strict';

const dayjs = require('dayjs');
function convertDate (date) {
  return dayjs(date).format('MM/DD/YYYY');
}

module.exports = (rawJobData) => {
  console.log('Zipping Data...');
  // zip the raw data into an array of objects
  let jobsData = rawJobData.titles.map((title, i) => {

    // extract the key from the URL
    let linkArr = rawJobData.URLs[i].split('/');
    let key = linkArr[linkArr.length - 1];

    let posted = convertDate(rawJobData.timeStamps[i]);

    // return the object
    return {
      key,
      title,
      company: rawJobData.companies[i],
      location: rawJobData.locations[i],
      posted,
      // timeStamp: rawJobData.timeStamps[i],
      URL: rawJobData.URLs[i],
      salary: rawJobData.salaries[i],
      tags: rawJobData.tags[i],
      details: rawJobData.details[i],
      source: 'web3.career',
    };
  });
  console.log('Data Zipped.');
  // return the zipped data
  return jobsData;
};

