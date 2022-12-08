import type { Application } from "express";
import counterRouter from "./counter";

const router = function (app: Application) {
  app.use("/counter", counterRouter);
};

export default router;
