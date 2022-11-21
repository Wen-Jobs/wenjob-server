const puppeteer = require('puppeteer');
const fs = require('fs');

async function getJobs() {
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

  // get the total number of pages to be scraped
  let pageNumSrcElement = await page.$eval('#hh', el => el.innerHTML);
  let srcArr = pageNumSrcElement.split(' ');
  let numPages = Math.ceil(+srcArr[1].replace(',', '') / 35);


  // iterate over each page (swap "i <= 1" with "i <= numPages" for full scrape)
  for (let i = 1; i <= 1; i++) {
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

      // grab URL for job posting
      let job_URL = el.map(href => href.children[1].children[0].href);

      // grab salary range for job
      let salary = el.map(elem => elem.children[4].children[0].innerText);

      return { jobs, companies, location, post_date, job_URL, salary };
    });

    let details = [];
    let detailSelector = '#job > div > div > div.text-dark-grey-text.px-3.pt-2';

    // click on each job posting and grab the description
    for (let j = 1; j <= 103; j += 3) {
      const jobBlockSelector = `body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(${j})`;
      await page.$eval(jobBlockSelector, elem => elem.click());
      await page.waitForTimeout(100);
      let detail = await page.$eval(detailSelector, (el, i) => {
        console.log('elem ___________--------------', i, el.innerText);
        return el.innerText;
      });
      details.push(detail);
    }

    const throwErr = (err) => {
        if(err) throw err;
        console.log('saved!');
    }

        // zip all job data points together and create an array of objects
    let jobCoPairs = table_row.jobs.map((job, i) => {
        let linkArr = table_row.job_URL[i].split('/');
        let key = linkArr[linkArr.length - 1];

        const job_listing = {
            job: job,
            company: table_row.companies[i],
            location: table_row.location[i],
            post_date: table_row.latest_post[i],
            link: table_row.job_URL[i],
            key,
            details: details[i],
        };
        
        //method appends specified content to a file. If the file does not exist, the file will be created
        fs.appendFile('wenjobs_test.json', JSON.stringify(job_listing), throwErr) 
        return job_listing;
     });
        // console.log('Job/Company Pairs: ', jobCoPairs);
    }
    
    // close browser instance
    await browser.close();
}

getJobs();
