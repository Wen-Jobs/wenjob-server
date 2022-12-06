'use strict';

module.exports = (siloedJobData) => {
  console.log('Zipping Data...');
  // zip the raw data into an array of objects
  let jobsData = siloedJobData.titles.map((title, i) => {

    // extract the key from the URL
    let linkArr = siloedJobData.URLs[i].split('/');
    let key = linkArr[linkArr.length - 1];

    // return the object
    return {
      key,
      title,
      company: siloedJobData.companies[i],
      location: siloedJobData.locations[i],
      timeStamp: siloedJobData.timeStamps[i],
      URL: siloedJobData.URLs[i],
      salary: siloedJobData.salaries[i],
      tags: siloedJobData.tags[i],
      details: siloedJobData.details[i],
      source: 'web3.careers',
    };
  });
  // return the zipped data
  return jobsData;
};

