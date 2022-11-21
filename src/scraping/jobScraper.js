const puppeteer = require('puppeteer');
const fs = require('fs');


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

    const url = 'https://web3.career/?page=1';
    await page.goto(url);

    let grabTotalJobListings = await page.$eval('#hh', el => el.innerHTML);
    let srcArr = grabTotalJobListings.split(' ');
    let totalPages = Math.ceil(+srcArr[1].replace(',', ' ') / 35);

    // #job > div > div > div.col-12.col-md-8.pe-0.pe-md-5 > div > div.text-dark-grey-text.p-2.p-md-0 > div:nth-child(3)

    for (let i = 1; i <= 1; i++) { // repeat in batches
        let url = `https://web3.career/?page=${i}`;
        console.log('Hitting URL...', `Page ${i}`)
        await page.goto(url);

        console.log('Scraping...');
        // click on each job listing & grab job details
        let details = [];
        for (let i = 1; i <= 50; i += 3) {
            await page.click(`body > main > div > div > div > div.row.row-cols-2 > div:nth-child(1) > table > tbody > tr:nth-child(${i})`);
            let detail = await page.$$eval('#job > div > div', (el, i) => {

                // convert string to array
                let desc = el[0].children[2].innerText.split(' ');
                // console.log(desc);

                // find index of
                // console.log(desc[200]);
                // desc.slice(0, 200);
                // console.log(desc.slice(0, 200).join(' '));
                // let indexToSlice = desc.indexOf('RMjYwMTo2MDA6OTY4MTo1ZDIwOjljNDoyYmIxOmQ3NzE6NWIyNwM');
                // console.log(indexToSlice);
                return el[0].children[2].innerText;
            });

            // console.log(detail);

            // attempted to find original job listing URL
            // let original_Listing = page.$$eval('#job > div > div > header > div.mt-2 > div > div > div.text-start.my-1.d-md-flex.justify-content-start.gap-3.d-none > a.my-btn.my-btn-primary-maximum', (el, i) => {

            //     console.log(el);
            //     // return el[0].children[2].innerText;
            // })
            details.push(detail);
        }

        const table_row = await page.$$eval('.table_row', el => {

            // grab job title
            let jobs = el.map(time => time.children[0].innerText);

            // grab company time
            let companies = el.map(h3 => h3.children[1].children[0].innerText);

            // grab job location
            let location = el.map(a => a.children[3].children[0].innerText)

            // grab time stamps for job postings
            let latest_post = el.map(time => time.children[2].querySelector('span').innerText);

            // grab URL for each job posting
            let job_URL = el.map(href => href.children[1].children[0].href);

            return { jobs, companies, location, latest_post, job_URL }
        });

        const throwErr = (err) => {
            if(err) throw err;
            console.log('saved!');
        }

        // Get all job information and return array of objects
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
            fs.appendFile('wenjobs_test.json', JSON.stringify(job_listing), throwErr) //method appends specified content to a file. If the file does not exist, the file will be created
            return job_listing;
        });
        // console.log('Job/Company Pairs: ', jobCoPairs);
    }

}

getJobs();
