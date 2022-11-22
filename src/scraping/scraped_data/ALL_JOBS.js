const page_1 = require('./page_1.json');
const page_2 = require('./page_2.json');
const page_3 = require('./page_3.json');
const page_4 = require('./page_4.json');
const page_5 = require('./page_5.json');
const page_6 = require('./page_6.json');
const page_7 = require('./page_7.json');
const page_8 = require('./page_8.json');
const page_9 = require('./page_9.json');
const page_10 = require('./page_10.json');

let most_recent = page_1.jobs[0].key;

module.exports = [
  { most_recent },
  ...page_1.jobs,
  ...page_2.jobs,
  ...page_3.jobs,
  ...page_4.jobs,
  ...page_5.jobs,
  ...page_6.jobs,
  ...page_7.jobs,
  ...page_8.jobs,
  ...page_9.jobs,
  ...page_10.jobs,
];
