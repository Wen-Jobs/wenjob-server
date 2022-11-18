const puppeteer = require('puppeteer');

const url = 'https://web3.career/?page=1';

async function getJobs() {
  // Launch browser instance
  console.log('Opening browser...');
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-setuid-sandbox"],
    'ignoreHTTPSErrors': true
});
  // Open new page or "tab" in browser
  console.log('Opening new page...');
  const page = await browser.newPage();
  // Go to URL
  console.log('Hitting URL...');
  await page.goto(url);
  // Get all job titles on page (returns array of element inner text)
  console.log('Scraping...');
  const table_row = await page.$$eval('.table_row', el => {
    console.log(el);

    // grab job title
    let jobs = el.map(time => time.children[0].innerText);

    // grab company time
    let companies = el.map(h3 => h3.children[1].children[0].innerText);

    // grab job location
    let location = el.map(a => a.children[3].children[0].innerText)

    // grab time stamps for job postings
    let latest_post = el.map(time => time.children[2].querySelector('span').innerText);
    return { jobs, companies, location, latest_post}
});
// console.log(table_row);
//   const jobs = await page.$$eval('h2', e => {
//     console.log(e);
//     return e.map(el => el.innerHTML)
//   });
  // first job posting fully displayed has the same element, so you must pop from the array to avoid this duplicate
//   jobs.pop();
  // // confirm length of jobs array returned from page.$$eval
  // let listLength = jobs.length;
  // console.log('Jobs length: ', listLength);
  // console.log('Jobs:', jobs);
  // // get all company names on page (returns array of element inner text)
//   const companies = await page.$$eval('h3', e => e.map(el => el.innerHTML));
  // // confirm length of companies array returned from page.$$eval
  // let companyLength = companies.length;
  // console.log('Companies length: ', companyLength);
  // console.log('Companies:', companies);
  // zip the jobs and companies together into an array of objects
  let jobCoPairs = table_row.jobs.map((job, i) => {
    return {
      job: job,
      company: table_row.companies[i],
      location: table_row.location[i],
      post_date: table_row.latest_post[i]
    };
  });

  console.log('Job/Company Pairs: ', jobCoPairs);
  // close browser instance
//   await browser.close();
}

getJobs();

// Time since posted selector
// body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(28) > td:nth-child(3) > span


// Estimated salary selector
// body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(5) > p
