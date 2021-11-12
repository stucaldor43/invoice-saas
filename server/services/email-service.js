const nodemailer = require("nodemailer");

class EmailService {
  static async sendEmail({ to, from, subject, text, html, attachments }) {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.ETHEREAL_USER,
          pass: process.env.ETHEREAL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      return await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
        attachments,
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = {
  EmailService
}
// async function main() {
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: process.env.ETHEREAL_USER, // generated ethereal user
//       pass: process.env.ETHEREAL_PASSWORD, // generated ethereal password
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main();
