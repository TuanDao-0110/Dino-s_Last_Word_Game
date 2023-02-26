import express, { Response, Request } from "express";
const router = express.Router();
import firebase from "../database/firebase";
const { wordDB } = firebase;

router.get("/", async (_req: Request, res: Response) => {
  await wordDB.on("value", (snapshot) => {
    let result = snapshot.val();
    return res.status(200).json({ result });
  });
});

export { router as wordRouter };
