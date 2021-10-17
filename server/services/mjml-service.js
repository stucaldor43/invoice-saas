import mjml2html from "mjml";

export class MjmlService {
  constructor() {}

  static render(template, options) {
    return mjml2html(template, options);
  }
}
