// import session from "express-session";
// import { PrismaSessionStore } from "@quixo3/prisma-session-store";
// import { prisma } from "./../database/prisma.js";

const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./../database/prisma")

async function addSessionMiddleware({ app }) {
  app.use(
    session({
      cookie: {
        path: "/",
        httpOnly: true,
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      },
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  );
}

module.exports = addSessionMiddleware