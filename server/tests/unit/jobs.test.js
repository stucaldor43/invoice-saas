const { sendDueSoonEmails } = require("./../../scheduler/jobs/due-soon-email");
const { EmailService } = require("./../../services/email-service");
const { subDays, startOfDay, addDays } = require("date-fns");

describe("Send Due Soon Email", () => {
  it("When an invoice is due within the next three days, a reminder email is sent", async function () {
    const invoices = [
      {
        client: { email: "foo@gmail.com" },
        user: { email: "bar@gmail.com" },
        dateDue: addDays(new Date(), 3),
        html: "<div>Hello</div>",
        text: "Hello",
        hasDueSoonEmailBeenSent: false,
      },
      {
        client: { email: "foo@gmail.com" },
        user: { email: "bar@gmail.com" },
        dateDue: addDays(new Date(), 2),
        html: "<div>Hello</div>",
        text: "Hello",
        hasDueSoonEmailBeenSent: false,
      },
    ];

    const emailsSent = await sendDueSoonEmails(invoices, EmailService);

    expect(emailsSent.length).toBe(2);
  });

  it("When no invoices are due within the next three days, no reminder emails are sent", async function () {
    const invoices = [
      {
        client: { email: "foo@gmail.com" },
        user: { email: "bar@gmail.com" },
        dateDue: subDays(new Date(), 4),
        html: "<div>Hello</div>",
        text: "Hello",
        hasDueSoonEmailBeenSent: false,
      },
      {
        client: { email: "foo@gmail.com" },
        user: { email: "bar@gmail.com" },
        dateDue: subDays(new Date(), 5),
        html: "<div>Hello</div>",
        text: "Hello",
        hasDueSoonEmailBeenSent: false,
      },
    ];

    const emailsSent = await sendDueSoonEmails(invoices, EmailService);

    expect(emailsSent.length).toBe(0);
  });

  it("When an invoice is due today, no reminder email is sent", async function () {
    const invoices = [
      {
        client: { email: "foo@gmail.com" },
        user: { email: "bar@gmail.com" },
        dateDue: new Date(),
        html: "<div>Hello</div>",
        text: "Hello",
        hasDueSoonEmailBeenSent: false,
      },
    ];

    const emailsSent = await sendDueSoonEmails(invoices);

    expect(emailsSent.length).toBe(0);
  });
});
