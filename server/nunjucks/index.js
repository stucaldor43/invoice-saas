const nunjucks = require("nunjucks");
const { toDollars } = require("./filters/to-dollars")

const env = new nunjucks.Environment();

env.addFilter("dollars", toDollars);
