"use strict";

const Zillow = require("../models/zillow");

const getAddressInfo = async function(req, res) {
  const { params: { address, cityStateZip } } = req;
  const data = await Zillow.getSearchResults(address, cityStateZip);
  res.json(data);
}

module.exports = {
  getAddressInfo
}