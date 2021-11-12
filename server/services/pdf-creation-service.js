const pdf = require("html-pdf");

function createPdf(html) {
  const options = { format: "Letter" };

  pdf
    .create(html, options)
    .toFile("./server/services/businesscard2.pdf", function (err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
}

module.exports = {
    createPdf
}
