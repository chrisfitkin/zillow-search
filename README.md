# Zillow Search
@chrisfitkin

Web app that allows a user to enter an address for a home and then see
details for that home from Zillow's GetSearchResults API.

## Run Locally
> requires: NodeJS - https://nodejs.org/en/download/
```sh
git clone https://github.com/chrisfitkin/zillow-search
cd zillow-search && npm install
npm run dev
```
Application runs at ```http://localhost:3000```

## Application Structure
```
Notable application directories and files.
.
├── client
│   └── src
│       └── components
│           └── App             # primary container & client logic
│           └── ...             # all other React compents
├── controllers
│   └── zillowController.js     # connects route to Zillow model
├── models
│   └── zillowController.js     # connects to Zillow API
├── routes
│   └── index.js                # defines API route(s)
├── .env
├── app.js                      # builds Express server
├── package.json
├── README.md
└── spec.js                     # tests
```

## Server
Server is build in NodeJS on ExpressJS server.  

## Client
Client is built in React.
### create-react-app
create-react-app was used to generate boilerplate application structure.
### State Management
State is managed primarily in a single App component using ```setState```.  In a more complex application, I would implement Redux for state management.
### Google Places Autocomplete
The address search field implements Autocomplete functionality leveraging the Google Places API.

## Testing
Basic integration testing is set up to show that the API server comes online, responds at the appropriate endpoints, and can connect to the Zillow API.  More unit testing for the backend would include mocks for the API.  No front end testing has been written, yet, but would be done with Enzyme.  Tests should also be integrated into the deployment process.  Tests can be run from the shell with the following commands.
```sh
npm install -g mocha
npm run test
```

## Code Style
Coding style generally adheres to AirBnB standards.  Next steps would be to include ESLint and linting rules to enforce standards.

## Hosting (Demo)
Demo is hosted on heroku at https://zillow-search.herokuapp.com