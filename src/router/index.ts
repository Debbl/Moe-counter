import type { Application } from "express";
import counterRouter from "./counter";

const router = function (app: Application) {
  app.use("/counter", counterRouter);
  
  // 404
  app.use((req, res, next) => {
    res.redirect("https://github.com/Debbl/Moe-counter");
  });
};

export default router;
