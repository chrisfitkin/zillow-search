"use strict";

const wait = seconds => new Promise(resolve => setTimeout(() => resolve(), seconds));

const read = async (address) => {
  await wait(3000);
  return address;
}

module.exports = {
  read
}