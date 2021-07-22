# Group A Repository

### How to run 
To run application
    1. in /etc/hosts map 127.0.0.1 to my.api
    2. to start use script start-https

### Technologies
Technologies used in the project:
    1. React.js
    2. Bootstrap.js
    3. Redux.js

### Authentication
Authentication was implemented using platform Auth0 and linked libraries.

## Testing

### Frontend

Run module tests by running "npm test"

Selenium Tests:
    Run the frontend
    Run the backend
    Ensure chrome is installed
    Install selenium extension in chrome
    Open selenium
    Open the test suite found in my-app/SeleniumTests
    Run the test suite


## Continuous Integration

We use Travis for our CI pipeline.
Every build that is pushed to any branch on GitHub is automatically tested by travis. This gives us an indication of whether the latest build is passing or failing and can inform us of whether to merge a branch or to do further development.