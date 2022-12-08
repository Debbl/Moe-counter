import { Router } from "express";
import counterController from "../controller/counter";

const counterRouter = Router({});

counterRouter.get("/:name", async (req, res) => {
  const { name = "" } = req.params;
  const { theme = "moebooru" } = req.query as { theme: string };

  // This helps with GitHub's image cache
  res.set({
    "content-type": "image/svg+xml",
    "cache-control": "max-age=0, no-cache, no-store, must-revalidate",
  });

  const renderSvg = await counterController.getCountImage(name, theme);

  res.send(renderSvg);
});

export default counterRouter;
