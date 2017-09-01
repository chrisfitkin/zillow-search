const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const routes = require('./routes');

require('dotenv').config()
const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Log requests
app.use((req, res, next) => {
  const { method, url } = req;
  console.log("[INFO]", `${method} ${url}`);
  next();
});

// Register custom routes
app.use('/api', routes);

// Serve React application using index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

// Start the app server
const port = process.env.PORT || 5000;
app.listen(port);

console.log(`App listening on ${port}`);