'use strict';

const { collection, query, getDocs, orderBy, limit } = require('firebase/firestore') ;

// require in the database
const db = require('../../firebase/firebase');

const getWeb3CareersMostRecent = async () => {

  // need to add additional query for source = web3careers

  // reference for the most recent job from web3.career in the database
  const jobRef = query(collection(db, 'jobs'), orderBy('key', 'desc'), limit(1));
  // get that most recent job from the database
  const jobsSnap = await getDocs(jobRef);
  // returns an object, so we need to get the key from the object
  const mostRecent = jobsSnap.docs[0].data().key;
  // return the key of the most recent job
  return mostRecent;
};

module.exports = getWeb3CareersMostRecent;
