# WenJobs Server

## Authors

- Robert Ball
- Alan Chelko
- Xavier Hillman
- Elaine Huynh
- Stephen Martinez
- Jack Stubblefield

### What is WenJobs?

A job board that utilizes scheduled web-scraping to collect current Web3 job postings. The data is then stored in a database and served to the front-end of the application. The front-end is built with React and is hosted on Firebase.

### Why did we build WenJobs?

- To create a more effective, efficient and natural path for job seekers to identify and obtain their next role.

- Job boards are great at percolating a vast array of jobs in one place, but are disconnected from your network and from each other. LinkedIn is a great resource for networking, but you have to have a specific job or company in mind in order to see who might be in your network. Lastly, researching companies and identifying a decent volume of meaningful opportunities in your particular area of interest is just unsolved currently.

- One of the hardest parts of the job hunt is networking---finding those people who can actually help you get your application seen and your voice heard. Often these quick conversations can lead to a job much more efficiently and effectively than any other job-seeking technique.

## Technologies Used

- Puppeteer: In order to find job data, web-scraping was required to target Web3 job boards and scrape job listings from available resources. This library allowed us to automate the process of navigating to the job board, searching for jobs, and collecting the data.

- GitHub Actions: Allows us to automate the process of running our web-scraping script on a schedule. This allowed us to run the script every 12 hours to collect the latest job data.

- Firebase: The database we used to hold the job data.

- Dayjs: A library used to format the date and time of the job listings.

## Run app locally

- Clone the repo
- Create a .env file in the root directory
- Create a firebase project and add a web app
  - You will be given a firebaseConfig object
- Add the following to the .env file:

```javascript
FIREBASE_API_KEY=<YOUR FIREBASE apiKey>
FIREBASE_AUTH_DOMAIN=<YOUR FIREBASE authDomain>
FIREBASE_PROJECT_ID=<YOUR FIREBASE projectId>
FIREBASE_STORAGE_BUCKET=<YOUR FIREBASE storageBucket>
FIREBASE_MESSAGING_SENDER_ID=<YOUR FIREBASE messagingSenderId>
FIREBASE_APP_ID=<YOUR FIREBASE appId>
FIREBASE_MEASUREMENT_ID=<YOUR FIREBASE measurementId>
PORT=<YOUR PORT>
```

- Install dependencies
  > npm i
  - This will install the following:
    - express
    - cors
    - dotenv
    - puppeteer
    - node-cron
    - dayjs
    - firebase

- To populate your database with approximately 1000 latest job listings (about 1 month of data), run the bigScraper.js file
  > node bigScraper.js
- To start the server, run:
  > node index.js
  - This will start the server and begin the scheduled scraping of job data (once every 12 hours).
