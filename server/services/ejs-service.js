const ejs = require("ejs");

class EjsService {
  constructor() {}

  static render(template, context = {}) {
    const html = ejs.render(template, context);
    return html;
  }
}

module.exports = {
  EjsService
}
