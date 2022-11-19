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


  const url = 'https://web3.career/?page=1';
  await page.goto(url);

  let pageNumSrcElement = await page.$eval('#hh', el => el.innerHTML);
  let srcArr = pageNumSrcElement.split(' ');
  let numPages = Math.ceil(+srcArr[1].replace(',', '') / 35);

  for (let i = 1; i <= 25; i++) {
    const url = `https://web3.career/?page=${i}`;
    console.log('Hitting URL...', `Page ${i}`);
    await page.goto(url);
    const table_row = await page.$$eval('.table_row', el => {
      console.log(el);

      // grab job title
      let jobs = el.map(time => time.children[0].innerText);

      // grab company time
      let companies = el.map(h3 => h3.children[1].children[0].innerText);

      // grab job location
      let location = el.map(a => a.children[3].children[0].innerText);

      // grab time stamps for job postings
      let post_date = el.map(time => time.children[2].querySelector('span').innerText);

      let job_URL = el.map(href => href.children[1].children[0].href);

      let salary = el.map(elem => elem.children[4].children[0].innerText);

      return { jobs, companies, location, post_date, job_URL, salary };
    });

    let jobCoPairs = table_row.jobs.map((job, i) => {

      let linkArr = table_row.job_URL[i].split('/');
      let key = linkArr[linkArr.length - 1];

      return {
        job: job,
        company: table_row.companies[i],
        location: table_row.location[i],
        post_date: table_row.post_date[i],
        job_URL: table_row.job_URL[i],
        key,
        salary: table_row.salary[i],
      };
    });

    allJobs = [...allJobs, ...jobCoPairs];
  }

  console.log('All Jobs: ', allJobs);

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

  // close browser instance
  await browser.close();
}

getJobs();

