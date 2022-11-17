
## Software Requirements
---------------------

## User Stories
------------

#### User Story One:

1.  Title: Login/Signup

2.  User Story sentence: As a job seeker, I want to log in using LinkedIn username, so that my network is visible to the app. 

3.  Feature Tasks

1.  Create a signup form for user to add email, password, linkedin username

2.  Create a login form/signin with linkedin button

3.  When the user clicks signup, their information should be added to a database

4.  When a user clicks login, they should be redirected to the app home page

#### User Story Two:

1.  Title: Highlight Connections

2.  User Story sentence:As a job seeker, I want my dashboard to highlight how many 1st ( stretch goal - 2nd degree connections ) I have.

3.  Feature Tasks

1.  Create an upload field for users to add their connections CSV file

2.  On submission the CSV file should be parsed and the number of connections identified

3.  All connections should be saved to the users account (database)

4.  Number of connections should be displayed on the dashboard

#### User Story Three:

1.  Title: Highlight Companies

2.  User Story sentence: As a job seeker, I want my dashboard to highlight how many companies are in my first 2 degrees

3.  Feature Tasks

1.  The connections data should be parsed and the companies of each person should be aggregated.

2.  Should filter out repeated companies

3.  The number of unique companies should be displayed on the dashboard

#### User Story Four:

1.  Title: Available "In-Network" Jobs

2.  User Story sentence: As a job seeker, I want to know which companies are hiring (via Indeed, monster, LI, etc), so I know where to apply "in-network". 

3.  Feature Tasks

1.  For each unique company in the users network, all open roles at that company should be collected.

2.  All collected jobs should be rendered on the dashboard

3.  User should be able to click in to an available job and see more information about it

4.  User should be able to click an apply now button and be brought to the application

#### User Story Five:

1.  Title: Filter Jobs

2.  User Story sentence: As a job seeker, I want to filter job descriptions by key words (or a boolean query), so that I can specifically find all the [data science / web3 / Django / React / AI / ...] jobs.

1.  Feature Tasks:

1.  Create a query filter that can filter returned jobs by a keyword  (ex. web3)

2.  There should be a UI component that makes the search term stand out.

3.  Should return jobs from ALL companies that match the keyword.

#### User Story Six:

1.  Title: Company Data

2.  User Story sentence:  As a job seeker, I want data for all Web3 companies, so that I can quickly see what stage companies are in, size, funding, location, focus, M/V/V. 

3.  Feature Tasks:

1.  Use the Web3 api to give users data about companies their connections work at.

2.  Create a separate tab on the dashboard to filter/show size, funding, location, focus, M/V/V

3.  Find companies that are associated with user connections and add a table to display only companies within user connections

## Scope (In/Out)
--------------

**IN** 

-   Describe the individual features that your product will do.

-   High overview of each. Only need to list 4-5

-   Allow users to upload a list of their current LinkedIn connections

-   Aggregate the companies your connections work for and display available jobs for each.

-   Allow users to see more information about the available jobs from their in-network companies

-   Allow users to filter job openings using company size, funding, location, focus, M/V/V

-   Implement user authentication & database for storing user information and company details

**OUT** 

-   These should be features that you will make very clear from the beginning that you will not do during development. These should be limited and very few. Pick your battles wisely. This should only be 1 or 2 things. Example: My website will never turn into an IOS or Android app.

-   Our app will not make use of 2nd degree connections

-   Our app will not utilize LinkedIn for login

-   This application will be used to display job information only

-   This application will not provide jobs outside of Web3

### Minimum Viable Product vs

What will your MVP functionality be?

-   Users can see their in-network companies and the roles being offered by them in order to more efficiently find their next role in web3.

What are your stretch goals?

-   Include 2nd degree connections

-   Offer jobs from any industry

-   Ability to directly contact your connection through the app

-   Ability to apply to jobs directly from the application

### Stretch

What stretch goals are you going to aim for?

Functional Requirements
-----------------------

1.  User authentication & sign up functionality

2.  Utilize job API/scrap job board for data

3.  Store user information within database (username, id, csv)

4.  Display all jobs from Job API

5.  Filter job search results using company information & linkedIn connections

### Data Flow

Non-Functional Requirements
--------------------------------------------

-   Testability - We will structure our app in the most modular way possible so that we have the ability to perform both unit tests and end-to-end testing. We will utilize Jest and MSW in order to test our frontend components, backend functions and API/Web scraping functionality.

-   Usability - Per our client's request, our app will be as clean and simple to use as possible. We will design our components in such a way that the application is straightforward and intuitive to use. It will have a familiar layout and easily distinguishable features.