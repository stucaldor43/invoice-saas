import os from "os";
import { parentPort } from "worker_threads";
import pLimit from "../../concurrency/index";
import { editInvoice, getInvoices } from "./../../models/invoice";
import {
  endOfYesterday,
  formatISO,
  startOfDay,
  subDays,
  startOfToday,
  endOfToday,
  differenceInCalendarDays,
} from "date-fns";
import { EmailService } from "./../../services/email-service";
import path from "path";
import { EjsService } from "../../services/ejs-service";
import { MjmlService } from "../../services/mjml-service";
import { convert } from "html-to-text";
import { createEmail } from "../../models/email";
import { invoiceDueSoonEmailTemplate } from "./../../templates/invoice-due-soon";

(async function () {
  try {
    const concurrency = os.cpus().length;

    const limit = pLimit(concurrency);

    const filters = {
      status: "UNPAID",
    };
    const pagination = { skip: 0 };
    const sort = { dateCreated: "desc" };

    const { invoices } = await getInvoices({ filters, pagination, sort });

    const promises = invoices
      .filter(
        (invoice) =>
          differenceInCalendarDays(new Date(), invoice.dateDue) % 7 === 0
      )
      .map(function (invoice) {
        const context = {
          invoiceNumber: invoice.invoiceId,
          issueDate: invoice.dateCreated,
          invoiceTotal: invoice.total,
          dueDate: invoice.dateDue,
        };

        const { html } = MjmlService.render(
          EjsService.render(invoiceDueSoonEmailTemplate, context)
        );

        return limit(async function () {
          const message = {
            to: invoice.client.email,
            from: invoice.user.email,
            subject: "Invoice overdue",
            text: convert(html, { wordwrap: 130 }),
            html,
            attachments: [
              {
                path: path.resolve(
                  __dirname,
                  "../../services/businesscard.pdf"
                ), // TODO: Change path
              },
            ],
          };

          const response = await EmailService.sendEmail(message);
          await editInvoice(invoice.invoiceId, {
            hasDueTodayEmailBeenSent: true,
          });

          await createEmail({
            template: "overdue",
            message,
            locals: context,
            response,
          });
        });
      });
    const result = await Promise.all(promises);
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
})();
