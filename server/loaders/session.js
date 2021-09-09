import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./../database/prisma.js";

export default async function ({ app }) {
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
