'use strict';

const { collection, query, getDocs, where } = require('firebase/firestore') ;

// require in the database
const db = require('../../firebase/firebase');

const getWeb3CareersMostRecent = async () => {
  // reference for jobs from web3.career in the database
  const jobRef = query(collection(db, 'jobs'), where('source', '==', 'web3.career'));
  // get all web3.career jobs from the database
  const jobsSnap = await getDocs(jobRef);
  // cleans and sorts returned data
  const jobs = jobsSnap.docs.map(doc => doc.data())
    .sort((a, b) => b.key - a.key);
  // get the key of the most recent job
  const mostRecent = jobs[0].key;
  // return the key of the most recent job
  return mostRecent;
  // return jobRef;
};

module.exports = getWeb3CareersMostRecent;
