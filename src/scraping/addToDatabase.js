'use strict';

const { collection, addDoc } = require('firebase/firestore');

// require in the database
const db = require('../firebase/firebase');

const addToDatabase = async (job) => {
  // add the job to the database
  await addDoc(collection(db, 'jobs'), job);
};

module.exports = addToDatabase;
