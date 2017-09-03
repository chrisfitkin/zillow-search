"use strict";

const Zillow = require("../models/zillow");

// Load address information from Zillow model and pass back to the consumer
const getAddressInfo = async function(req, res) {
  const { params: { address, cityStateZip } } = req;
  const data = await Zillow.getSearchResults(address, cityStateZip);
  res.json(data);
}

module.exports = {
  getAddressInfo
}