import "./config";
import express from "express";
import loaders from "./loaders";

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app.listen(process.env.PORT, function () {
    console.log(`Serving api on port ${process.env.PORT}`);
  });
}

startServer();
