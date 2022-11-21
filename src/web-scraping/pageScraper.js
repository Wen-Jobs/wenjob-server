const scraperObject = {
    url: 'https://web3.career/',
    async scraper(browser) {
      let page = await browser.newPage();
      console.log(`Navigating to ${this.url}...`);
      await page.goto(this.url);

      // grab listings from home page
      await page.waitForSelector('.table'); // wait for selector method waits for the elem that contains all job title mobile related information

      let job_listings = await page.$$eval('.table_row', listing => {

        // grab each parent div wrapping the table rows
        let title_div = listing.map(el => el.querySelector('.job-title-mobile'));
        let titles = title_div.map(job => job.innerText);

        let company_div = listing.map(el => el.querySelector('.job-location-mobile'));
        let companies = company_div.map(company => company.innerText);

        console.log(title_div);
        // console.log(titles);
        // console.log(companies);

        // title_div.map(el => )

        // find the nested href within each div
        let job_postings = title_div.map(el => el.querySelector('a').href);
        return job_postings;
      });


    //   // Grab Listings and scrape data from each listing page
    //   let pagePromise = (link) => new Promise(async (resolve, reject) => {
    //     let dataObj = {};
    //     let newPage = await browser.newPage();
    //     await newPage.goto(link);
    //     dataObj['jobTitle'] = await newPage.$$eval('h1', text => text[0].textContent);
    //     dataObj['jobDescription'] = await newPage.$$eval('div .text-dark-grey-text', description => {
    //       // console.log('description ', description[0].innerText);

    //       // grab data from the div containing job description text
    //       return description[0].innerText
    //       // console.log(content_Array[0].innerText);
    //     });
    //     dataObj['badges'] = await newPage.$$eval('.my-badge', span => {
    //       return span.map(badge => badge.innerText);
    //     });
    //     console.log(dataObj);
    //   });

    //   pagePromise(job_listings[0])
    //   pagePromise(job_listings[1])
    //   pagePromise(job_listings[2])
    //   pagePromise(job_listings[3])
    //   pagePromise(job_listings[4])

    //   let results = job_listings.map(job => {
    //     return pagePromise(job);
    //   });
    //   console.log(results);
    }
  }

  module.exports = scraperObject;
