"use strict";

const request = require('request-promise');
const xml2js = require('xml2js');

require('dotenv').config()
const url = '';

const getSearchResults = (address, cityStateZip) => {
  return new Promise((resolve, reject) => {
    // Setup querystring with required options
    var options = {
      uri: 'https://www.zillow.com/webservice/GetSearchResults.htm',
      qs: {
        'zws-id': process.env.ZILLOW_API_KEY || null,
        'address': address || '',
        'citystatezip': cityStateZip || '',
      }
    };
    
    // Send request to Zillow API
    request(options)
      .then(function (xml) {
        const data = xml2js.parseString(xml, function (err, data) {
          const result = data['SearchResults:searchresults'];
          if (result.message[0].code[0] >= 400) {
            // Received error response from Zillow
            console.log('[ERROR]', result.message[0]);
            resolve({ error: result.message[0].text[0] });
          } else {
            // Parse results from Zillow
            resolve(result.response[0].results[0].result[0] || { error: "No matching property found." });
          }
        });
      })
      .catch(function (err) {
        console.log("[ERROR] ", err);
        resolve({ error: "Error connecting to Zillow API." });
      });
  });
}

module.exports = {
  getSearchResults
}