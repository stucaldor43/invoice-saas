import cors from "cors";
import express from "express";
import apiRouter from "./../api";
import { addUser, getUser, getUserByCredentials } from "./../models/user";
import { PERMISSIONS } from "./../auth/permissions";
import { PLAN } from "./../constants/plans";

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

export default async function ({ app }) {
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));
  app.use(express.json());
  app.use("/api", apiRouter);

  app.post("/register", async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await getUser({ email });

      if (req.session.user) {
        return res.status(400).send({
          error: `You are currently logged in. Only guests may create an account.`,
        });
      }
      if (user) {
        return res
          .status(400)
          .send({ error: `User with the name ${name} already exists` });
      }

      const newUser = await addUser({ email, password, plan: PLAN.BASIC });

      res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  const authCookie = {
    httpOnly: false,
    maxAge: 31540000000,
    secure: false,
    sameSite: "lax",
  };

  app.post("/login", async function (req, res) {
    const { email, password } = req.body;

    try {
      const user = await getUserByCredentials({ email, password });
      if (!user) return res.sendStatus(401);

      req.session.user = {
        id: user.id,
        name: user.name,
        permissions: user.role ? PERMISSIONS[user.role] : [],
      };

      res
        .status(200)
        .cookie("login", JSON.stringify(user), authCookie)
        .json(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });

  app.post("/logout", function (req, res) {
    req.session.destroy();
    res.clearCookie("login", { ...authCookie, maxAge: -1 }).sendStatus(204);
  });
}
