const express = require("express");
const userRouter = require("./user");
const clientRouter = require("./client");
const invoiceRouter = require("./invoice");

const router = express.Router();

router.use("/user", userRouter);
router.use("/client", clientRouter);
router.use("/invoice", invoiceRouter);

module.exports = router;
