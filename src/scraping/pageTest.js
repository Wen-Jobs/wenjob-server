const e = require('express');
const puppeteer = require('puppeteer');


async function getJobs() {
  let allJobs = [];
  // Launch browser instance
  console.log('Opening browser...');
  const browser = await puppeteer.launch();
  // Open new page or "tab" in browser
  console.log('Opening new page...');
  const page = await browser.newPage();
  // Go to URL
  console.log('Hitting URL...');
  // Get all job titles on page (returns array of element inner text)
  console.log('Scraping...');
  // Estimate how many pages to scrape
  const url = 'https://web3.career/?page=1';
  await page.goto(url);
  let pageNumSrcElement = await page.$eval('#hh', el => el.innerHTML);
  let srcArr = pageNumSrcElement.split(' ');
  let numPages = Math.ceil(+srcArr[1].replace(',', '') / 35);
  console.log(numPages);

  for(let i = 1; i <= 2; i++) {
    const url = `https://web3.career/?page=${i}`;
    await page.goto(url);
    const jobs = await page.$$eval('h2', e => e.map(el => el.innerHTML));
    jobs.pop();
    const companies = await page.$$eval('h3', e => e.map(el => el.innerHTML));
    let jobCoPairs = jobs.map((job, i) => {
      return {
        job: job,
        company: companies[i],
      };
    });
    allJobs = [...allJobs, ...jobCoPairs];
  }
  console.log('All Jobs: ', allJobs);
  console.log('All Jobs Length: ', allJobs.length);
  // first job posting fully displayed has the same element, so you must pop from the array to avoid this duplicate
  // // confirm length of jobs array returned from page.$$eval
  // let listLength = jobs.length;
  // console.log('Jobs length: ', listLength);
  // console.log('Jobs:', jobs);
  // // get all company names on page (returns array of element inner text)
  // // confirm length of companies array returned from page.$$eval
  // let companyLength = companies.length;
  // console.log('Companies length: ', companyLength);
  // console.log('Companies:', companies);
  // zip the jobs and companies together into an array of objects
  // close browser instance
  await browser.close();
}

getJobs();

// Time since posted selector
// body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(28) > td:nth-child(3) > span


// Estimated salary selector
// body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(4) > td:nth-child(5) > p
