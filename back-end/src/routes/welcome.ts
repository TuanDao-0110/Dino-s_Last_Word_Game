import express, { Response, Request } from "express";
const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("welcome  to our hang man game");
});

export { router as welcomeRouter };
