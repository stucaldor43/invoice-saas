const mjml2html = require("mjml");

class MjmlService {
  constructor() {}

  static render(template, options) {
    return mjml2html(template, options);
  }
}

module.exports = {
  MjmlService
}