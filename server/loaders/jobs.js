const path = require("path");
const Bree = require("bree");

async function getScheduler() {
  const bree = new Bree({
    root: path.resolve(__dirname, "../scheduler/jobs"),
    jobs: [
      {
        name: "due-soon-email",
        // interval: "2ms",
        timeout: "2000ms",
      },
    ],
  });

  // bree.start();
  return bree;
}

module.exports = getScheduler
