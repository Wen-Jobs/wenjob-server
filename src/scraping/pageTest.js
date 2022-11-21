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
  const url = 'https://web3.career/?page=1';
  await page.goto(url);
  console.log('Scraping...');

  let details = [];
  let detailSelector = '#job > div > div > div.text-dark-grey-text.px-3.pt-2';

  for (let j = 1; j <= 103; j += 3) {
    const jobBlockSelector = `body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(${j})`;
    await page.$eval(jobBlockSelector, elem => elem.click());
    await page.waitForTimeout(100);

      // let detailsURL = await page.$eval(jobsListingURLSelector, el => {
      //   console.log(el);
      //   el.click()
      // });
      // console.log(detailsURL);
      // let popUp = await page.$eval(jobsListingURLSelector, elem =>{

      //   alert(elem.getAttribute('click'));
      //   // elem.click()

      // });

      // let bowserPages = await browser.pages();
      // console.log('pages----------', page.browserContext().emitter.on)

      // page.waitForTimeout(300);
      // let url2 = page.url();
      // // await page.close();
      // console.log('url-------',url2);

    let detail = await page.$eval(detailSelector, (el, i) => {
      console.log('elem ___________--------------', i, el.innerText);
      return el.innerText;
    });
    details.push(detail);
  }

  console.log('details:', details);
  console.log('details length:', details.length);

  // Estimate how many pages to scrape

  // let pageNumSrcElement = await page.$eval('#hh', el => el.innerHTML);
  // let srcArr = pageNumSrcElement.split(' ');
  // let numPages = Math.ceil(+srcArr[1].replace(',', '') / 35);

  // for(let i = 1; i <= 2; i++) {
  //   const url = `https://web3.career/?page=${i}`;
  //   await page.goto(url);
  //   const jobs = await page.$$eval('h2', e => e.map(el => el.innerHTML));
  //   jobs.pop();
  //   const companies = await page.$$eval('h3', e => e.map(el => el.innerHTML));
  //   let jobCoPairs = jobs.map((job, i) => {
  //     return {
  //       job: job,
  //       company: companies[i],
  //     };
  //   });
  //   allJobs = [...allJobs, ...jobCoPairs];
  // }
  // console.log('All Jobs: ', allJobs);
  // console.log('All Jobs Length: ', allJobs.length);
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

