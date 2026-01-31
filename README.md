# ITPM-Playwright-project
3rd year 1st semester ITPM (IT3040) module's assignment 1( individual)- test automation ability with Playwright tool

#INSTRUCTIONS ON HOW TO INSTALL DEPENDENCIES AND RUN THE TESTS.#

#Prerequisites
Node.js (version 14 or higher) installed on your machine. You can download it from 'nodejs.org'.
  To check Node version run below 2 commands and check:
  
    npm --version 
    node --version
        
  if it is giving  an error install it first
  
1.Clone the repository(if not already done):

    git clone <repository-url>
    cd <repository-directory>

2.Install the project dependencies:

    npm init -y  # Initializes a package.json if not present
    npm init playwright@latest

3.Answer all the questions with:
  JavaScript
  true for others

#Running the Tests
You can run the tests using the Playwright CLI. Each test file can be run individually or all together.

##Run All Tests
To run all test files (positive-functional.spec.js, negative-functional.spec.js, ui-tests.spec.js):

    npx playwright test

  ##Run Specific Test Files

   ###Positive Functional Tests:

    npx playwright test positive-functional.spec.js

   ###Negative Functional Tests:

    npx playwright test negative-functional.spec.js

   ###UI Tests:

    npx playwright test ui-tests.spec.js

#Run in Headed Mode (with Browser UI)

Add the --headed flag to see the browser during execution:

    npx playwright test ui-tests.spec.js --headed
  
#To run in a specific browser add the --project <browser_name> flag 

    npx playwright test ui-tests.spec.js --project chromium --headed

#View Test Report
After running tests, view the HTML report:

 Ctrl + click on the link named 'npx playwright show-report' 
   OR simply copy that command and run

    npx playwright show-report



