// import os from "os";
// import { parentPort } from "worker_threads";
// import pLimit from "./../../concurrency/index.js";
// import { editInvoice, getInvoices } from "./../../models/invoice.js";
const {
  endOfYesterday,
  formatISO,
  startOfDay,
  subDays,
  addDays,
  endOfDay,
} = require("date-fns");
// import { EmailService } from "./../../services/email-service.js";
const path = require("path");
// import { EjsService } from "../../services/ejs-service.js";
// import { MjmlService } from "../../services/mjml-service.js";
// import { convert } from "html-to-text";
// import { createEmail } from "../../models/email.js";
// import { invoiceDueSoonEmailTemplate } from "./../../templates/invoice-due-soon.js";
// const concurrency = os.cpus().length;

// const limit = pLimit(concurrency);

// const nums = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
//   23, 24,
// ];

// const promises = nums.map(function (num) {
//   return limit(() => setTimeout(() => console.log(num), 1000));
// });

// get all invoices due within the next 3 days that haven't already had email sent

// const filters = {
//   dateDue: {
//     gte: formatISO(startOfDay(subDays(new Date(), 3))),
//     lte: formatISO(endOfYesterday()),
//   },
//   hasDueSoonEmailBeenSent: false,
//   status: "PENDING",
// };
// const pagination = { skip: 0 };
// const sort = { dateCreated: "desc" };

// const { invoices } = await getInvoices({ filters, pagination, sort });

// const template = `
// <mjml>
// <mj-body>

//   <mj-section>
//     <mj-column>
//       <mj-text>Dear Customer,</mj-text>
//       <mj-text>Please view the details of the invoice below.</mj-text>
//       <mj-text>Invoice: <%=invoiceNumber%> </mj-text>
//       <mj-text>Issue Date: <%=issueDate%></mj-text>
//       <mj-text>Invoice Total: <%=invoiceTotal%></mj-text>
//       <mj-text>Due Amount: <%=invoiceTotal%></mj-text>
//       <mj-text>Due Date: <%=dueDate%></mj-text>
//       <mj-button>Pay Now</mj-button>
//     </mj-column>
//   </mj-section>
// </mj-body>
// </mjml>
// `;

// const promises = invoices.map(function (invoice) {
//   // return limit(() => EmailService.sendEmail());
//   const context = {
//     invoiceNumber: invoice.invoiceId,
//     issueDate: invoice.dateCreated,
//     invoiceTotal: invoice.total,
//     dueDate: invoice.dateDue,
//   };

//   const html = MjmlService.render(EjsService.render(template, context));

//   return limit(async function () {
//     const message = {
//       to: invoice.client.email,
//       from: invoice.user.email,
//       subject: "Invoice due soon",
//       text: convert(html, { wordwrap: 130 }),
//       html,
//       attachments: [
//         { path: path.resolve(__dirname, "../../services/businesscard.pdf") },
//       ],
//     };

//     const response = await EmailService.sendEmail(message);
//     await editInvoice(invoice.invoiceId, { hasDueSoonEmailBeenSent: true });
//     // update boolean indicating email is sent
//     await createEmail({
//       template: "due-soon",
//       message,
//       locals: context,
//       response,
//     });
//   });
// });
// in another file, for overdue email job check if invoice status is overdue and
// delta between current date and due date is divisible by 7, send email
// and update timestamp for time_overdue_email_sent

// (async function () {
//   try {
//     const concurrency = os.cpus().length;

//     const limit = pLimit(concurrency);

//     const filters = {
//       dateDue: {
//         gte: formatISO(startOfDay(subDays(new Date(), 3))),
//         lte: formatISO(endOfYesterday()),
//       },
//       hasDueSoonEmailBeenSent: false,
//       status: "PENDING",
//     };
//     const pagination = { skip: 0 };
//     const sort = { dateCreated: "desc" };

//     const { invoices } = await getInvoices({ filters, pagination, sort });

//     const promises = invoices.map(function (invoice) {
//       const context = {
//         invoiceNumber: invoice.invoiceId,
//         issueDate: invoice.dateCreated,
//         invoiceTotal: invoice.total,
//         dueDate: invoice.dateDue,
//         userFullName: invoice.user.fullName,
//       };

//       const { html } = MjmlService.render(
//         EjsService.render(invoiceDueSoonEmailTemplate, context)
//       );

//       return limit(async function () {
//         const message = {
//           to: invoice.client.email,
//           from: invoice.user.email,
//           subject: "Invoice due soon",
//           text: convert(html, { wordwrap: 130 }),
//           html,
//           attachments: [
//             {
//               path: path.resolve(__dirname, "../../services/businesscard.pdf"), // TODO: Change path
//             },
//           ],
//         };

//         const response = await EmailService.sendEmail(message);
//         await editInvoice(invoice.invoiceId, { hasDueSoonEmailBeenSent: true });

//         await createEmail({
//           template: "due-soon",
//           message,
//           locals: context,
//           response,
//         });
//       });
//     });
//     const result = await Promise.all(promises);
//     // console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// })();

// export async function sendDueSoonEmails(invoices) {
//   const promises = invoices.map(function (invoice) {
//     return limit(async function () {
//       const message = {
//         to: invoice.client.email,
//         from: invoice.user.email,
//         subject: "Invoice due soon",
//         text: convert(html, { wordwrap: 130 }),
//         html,
//         attachments: [
//           {
//             path: path.resolve(__dirname, "../../services/businesscard.pdf"), // TODO: Change path
//           },
//         ],
//       };

//       const smtpTransport = await EmailService.sendEmail(message);
//     });
//   });
// }

async function sendDueSoonEmails(invoices, emailService) {
  function isDueWithinNextThreeDays(invoice) {
    return (
      invoice.dateDue >= startOfDay(addDays(new Date(), 1)) &&
      invoice.dateDue <= endOfDay(addDays(new Date(), 3))
    );
  }

  function emailHasNotBeenSent(invoice) {
    return (
      typeof invoice.hasDueSoonEmailBeenSent === "boolean" &&
      !invoice.hasDueSoonEmailBeenSent
    );
  }

  const promises = invoices
    .filter(isDueWithinNextThreeDays)
    .filter(emailHasNotBeenSent)
    .map(function (invoice) {
      return async function sendEmailPromise() {
        const message = {
          to: invoice.client.email,
          from: invoice.user.email,
          subject: "Invoice due soon",
          text: invoice.text,
          html: invoice.html,
          attachments: [
            {
              path: path.resolve(__dirname, "../../services/businesscard.pdf"), // TODO: Change path
            },
          ],
        };

        // await emailService.sendEmail(message);

        // return message;
        // if (!isDueWithinNextThreeDays(invoice)) return;
        const transport = await emailService.sendEmail(message);

        return transport;
      };
    });

  return await Promise.all(promises);
}

module.exports = {
  sendDueSoonEmails,
};
