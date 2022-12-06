'use strict';

module.exports = async (page, numPages) => {

  let siloedJobData = {
    titles: [],
    companies: [],
    locations: [],
    timeStamps: [],
    URLs: [],
    salaries: [],
    tags: [],
    details: [],
  };

  for (let i = 1; i <= numPages; i++) {
    console.log(`Hitting URL... Page: ${i}`);
    // go to the page
    const url = `https://web3.career/?page=${i}`;
    await page.goto(url);
    console.log(`Scraping... Page: ${i}`);
    // grabbing data from the entire page
    let pageData = await page.$$eval('.table_row', jobBlocks => {
      // grab all job titles
      let titles = jobBlocks.map(block => block.children[0].innerText);
      // grab all company names
      let companies = jobBlocks.map(block => block.children[1].innerText);
      // grab all locations
      let locations = jobBlocks.map(block => block.children[3].innerText);
      // grab all time stamps
      let timeStamps = jobBlocks.map(block => block.children[2].innerText);
      // grab all URLs
      let URLs = jobBlocks.map(block => block.children[1].children[0].href);
      // grab all salaries
      let salaries = jobBlocks.map(block => block.children[4].innerText);
      // grab all tags
      let tags = jobBlocks.map(block => block.children[5].innerText.split(' '));

      // return all raw page data
      return {
        titles,
        companies,
        locations,
        timeStamps,
        URLs,
        salaries,
        tags,
      };
    });

    // push all page data into the siloedJobData object to consolidate all data
    siloedJobData.titles.push(...pageData.titles);
    siloedJobData.companies.push(...pageData.companies);
    siloedJobData.locations.push(...pageData.locations);
    siloedJobData.timeStamps.push(...pageData.timeStamps);
    siloedJobData.URLs.push(...pageData.URLs);
    siloedJobData.salaries.push(...pageData.salaries);
    siloedJobData.tags.push(...pageData.tags);

    // initialize details array
    let details = [];
    // selector for the job description
    let detailSelector = '#job > div > div > div.text-dark-grey-text.px-3.pt-2';

    // click on each job posting and grab the description
    for (let j = 1; j <= 103; j += 3) {
      const jobBlockSelector = `body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(${j})`;

      // click on the job block
      await page.$eval(jobBlockSelector, elem => elem.click());
      // wait for the page to load
      await page.waitForTimeout(500);
      // grab the description
      let detail = await page.$eval(detailSelector, (el, i) => {
        return el.innerText;
      });
      // push the description to the details array
      details.push(detail);
    }

    // add the details to the siloedJobData object
    siloedJobData.details.push(...details);
  }
  // return the raw data
  return siloedJobData;
};