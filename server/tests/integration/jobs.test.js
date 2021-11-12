// import { sendDueSoonEmails } from "./../../scheduler/jobs/due-soon-email.js";
// import { EmailService } from "./../../services/email-service.js";
// import { subDays, startOfDay } from "date-fns";
// import { once } from "events";
// import delay from "delay";
// import { getScheduler } from "./../../loaders/jobs.js";
const { PrismaClient } = require("@prisma/client");
// https://dev.to/eddeee888/how-to-write-tests-for-prisma-with-docker-and-jest-593i

describe("Send Due Soon Email", () => {
  // it("At the appropriate time, due-soon-email job runs ", async function () {
  //   const logger = {};
  //   logger.info = () => {};

  //   const bree = await getScheduler();

  //   bree.run("due-soon-email");
  //   await delay(1);

  //   expect(typeof bree.workers["due-soon-email"]).toBe("object");

  //   const [code] = await once(bree.workers["due-soon-email"], "exit");
  //   expect(code).toBe(0);

  //   expect(typeof bree.workers["due-soon-email"]).toBe("undefined");
  // });
  it("is defined", async function () {
    const prisma = new PrismaClient();
    expect(prisma).toBeDefined();
  });
});
