const express = require("express");
const {
  addInvoice,
  editInvoice,
  getInvoice,
  getInvoices,
} = require("./../models/invoice");
const { renderTemplate } = require("./../services/nunjucks-service");
const { createPdf } = require("../services/pdf-creation-service");
const { getUser } = require("./../models/user");

const fs = require("fs");
const { getClient } = require("../models/client");
const {
  queryStringFiltersToObject,
  queryStringSortValueToObject,
} = require("../utils");

const fileContents = fs.readFileSync("server/templates/01.njk", "utf-8");
// console.log("file contents: " + fileContents);

const router = express.Router();

router.post("/", async function (req, res) {
  try {
    const invoice = await addInvoice(req.body, { user: req.session.user });

    // res.status(201).json(invoice);

    // render html template as string

    // pass string to pdf creation service
    const user = await getUser({ id: req.session.user.id });
    const client = await getClient({ clientId: invoice.clientId });

    const html = renderTemplate({
      template: fileContents,
      ctx: {
        ...req.body,
        invoiceNumber: invoice.invoiceId,
        client: { ...client },
        user: { ...user },
      },
    });
    // create pdf with pdf creation service
    createPdf(html);
    // get pdf path
    // upload pdf to cloudinary
    // set invoices pdfpath to url of cloudinary pdf file
    res.status(201).json(invoice);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/", async function (req, res) {
  try {
    const pagination = {
      take: Number(isNaN(req.query.limit) ? 10 : req.query.limit),
      skip: Number(isNaN(req.query.offset) ? 0 : req.query.offset),
    };

    const sort = req.query.sort
      ? queryStringSortValueToObject(req.query.sort)
      : [{ invoiceId: "asc" }];

    const filters =
      Object.keys(req.query).filter(
        (word) => !["limit", "offset", "sort"].includes(word)
      ).length === 0
        ? {}
        : queryStringFiltersToObject(req.query);

    const invoiceQueryResults = await getInvoices({
      pagination,
      filters,
      sort,
    });

    res.status(200).json(invoiceQueryResults);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/:id", async function (req, res) {
  try {
    const invoice = await getInvoice({ invoiceId: Number(req.params.id) });
    if (req.session.user.id !== invoice.userId) return res.sendStatus(401);

    res.status(201).json(invoice);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.patch("/:id", async function (req, res) {
  try {
    const invoice = await editInvoice(req.params.id, req.body);
    res.status(201).json(invoice);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;

// (function () {
//   createPdf(
//     renderTemplate({
//       template: fileContents,
//       ctx: {
//         invoiceId: 12345,
//         dateCreated: "",
//         dateDue: "",
//         status: "PENDING",
//         posthookUrl: "",
//         total: 9800,
//         taxRate: 110,
//         subTotal: 1100,
//         pdfUrl: "",
//         notes: "This is a sample note for client.",
//         template: "",
//         dateSent: "",
//         isRecurring: false,
//         billingType: "ONCE",
//         items: [
//           {
//             name: "Item 1",
//             description: "Wordpress development",
//             quantity: 1,
//             cost: 1200,
//             rate: "25/hr",
//           },
//           {
//             name: "Item 1",
//             description: "IOS development",
//             quantity: 1,
//             cost: 3200,
//             rate: "25/hr",
//           },
//           {
//             name: "Item 1",
//             description: "Wordpress development",
//             quantity: 1,
//             cost: 1200,
//             rate: "25/hr",
//           },
//         ],
//         client: {},
//       },
//     })
//   );
// })();
