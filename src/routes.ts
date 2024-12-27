import express, { Request, Response } from "express";
import NameController from "./controllers/NameControllers";
import SortedController from "./controllers/SortedControllers";

const router = express.Router();

router.post("/createnames", (req: Request, res: Response) => {
  NameController.saveNames(req, res).catch((error) =>
    res.status(500).send(error.message)
  );
});

router.get("/names", async (req: Request, res: Response) => {
  try {
    await NameController.getAllNames(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

router.post("/sortnames", async (req: Request, res: Response) => {
  try {
    await SortedController.sortNames(req, res);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send("An unknown error occurred");
    }
  }
});

export default router;
