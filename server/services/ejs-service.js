import ejs from "ejs";

export class EjsService {
  constructor() {}

  static render(template, context = {}) {
    const html = ejs.render(template, context);
    return html;
  }
}
