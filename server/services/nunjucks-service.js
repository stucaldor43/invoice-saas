// import "./../nunjucks/index";
const nunjucks = require("nunjucks");
const { toDollars } = require("./../nunjucks/filters/to-dollars");
const { iso8601toYYYYMMDD } = require("./../nunjucks/filters/to-yyyymmdd");

// const env = new nunjucks.Environment();
const env = nunjucks.configure({ autoescape: true });
env.addFilter("dollars", toDollars);
env.addFilter("yyyymmdd", iso8601toYYYYMMDD);

function renderTemplate({ template, ctx }) {
  // nunjucks.configure({ autoescape: true });
  // const value = nunjucks.renderString("Hello {{ username }}", {
  //   username: "James",
  // });
  const value = env.renderString(template, ctx);

  console.log(value);
  return value;
}

module.exports = {
  renderTemplate
}
