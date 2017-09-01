"use strict";

const Chris = require("../models/chris");

const getAddress = async function(req, res) {
  const { params: { address } } = req;
  const data = await Chris.read(address);
  res.json(data);
}

module.exports = {
  getAddress
}