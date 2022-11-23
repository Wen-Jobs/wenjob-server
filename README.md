# Wen Jobs Server

## Authors
- Robert Ball
- Alan Chelko
- Xavier Hillman
- Elaine Huynh
- Stephen Martinez
- Jack Stubblefield

## Deployed Server
  - https://wen-jobs-server-deploy-prod.onrender.com

## Run app locally
- npm i express cors dotenv puppeteer node-cron

#### Vision
Web scraping tool to handle current Web3 job listings available for users.

What is the vision of this product?

-   To create a more effective, efficient and natural path for job seekers to identify and obtain their next role.

What pain point does this project solve?

-   Job boards are great at percolating a vast array of jobs in one place, but are disconnected from your network and from each other. LinkedIn is a great resource for networking, but you have to have a specific job or company in mind in order to see who might be in your network. Lastly, researching companies and identifying a decent volume of meaningful opportunities in your particular area of interest is just unsolved currently.

Why should we care about your product?

-   One of the hardest parts of the job hunt is networking---finding those people who can actually help you get your application seen and your voice heard. Often these quick conversations can lead to a job much more efficiently and effectively than any other job-seeking technique.

## Technologies Used
  - Puppeteer: In order to find job data, webscraping was required to target Web3 job boards and scrape job listings from available resources. This library is a Node library that was used to scrape data from job boards

  - File system (fs): A built in Node library to interact with the file system which is being used to write scraped data into JSON files to be used

  - Node-cron: A job scheduler for Node that helped build the functionality behind scheduled data scraping to provide users with the latest data

  - Express: A basic express server was built in order to facilitate HTTP requests that sends job listing data to the front-end of the application

## API
    - Endpoints:
      - /updateJobs - returns response array with most recent job listings within last 12h
      - /getJobs - returns array of job listings


Domain Modeling
---------------

![UML version 1.0.0](./assets/UML-wen.png)

## Proposed Database Schema - for future development
![SQL Database organization](./assets/sql-propsal.png)


