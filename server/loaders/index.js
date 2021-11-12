const expressLoader = require("./express");
const sessionLoader = require("./session");
const jobLoader = require("./jobs");

async function runLoaders({expressApp}) {
  await sessionLoader({ app: expressApp });
  console.log("Sessions Initialized");

  await expressLoader({ app: expressApp });
  console.log("Express Initialized");

  const bree = await jobLoader();
  bree.start();
  console.log("Breejs Initialized");
}

module.exports = runLoaders