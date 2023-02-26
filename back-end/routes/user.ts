import express, { Response, Request } from "express";
const router = express.Router();
import firebase from "../database/firebase";
// import { checkToken } from "../utils/middleware";
const { scoreDB, admin } = firebase;
interface CustomRequest extends Request {
  currentUser?: any;
}
// router.use(checkToken);
router
  .post("/", async (_req: CustomRequest, res: Response) => {
    let data = _req.body;
    // console.log(_req.currentUser);
    data.timestamp = admin.database.ServerValue.TIMESTAMP;
    data.uid = _req.currentUser.uid;
    const userScoresRef = admin.database().ref(`scores/${data.uid}`);
    try {
      await userScoresRef.push(data);
      return res.status(200).json({ msg: "add ok" });
    } catch (error) {
      return res.status(500).json({ msg: "Error storing data" });
    }
  })
  .get("/", async (_req: Request, res: Response) => {
    await scoreDB.once("value", (snapshot) => {
      let result = snapshot.val();
      return res.status(200).json({ result });
    });
  })
  .get("/:id", async (_req: Request, res: Response) => {
    const id = _req.params.id;
    try {
      const scoreRef = admin.database().ref(`scores/${id}`);
      await scoreRef.once("value", (snapshot) => {
        const scoreData = snapshot.val();
        return res.status(200).json({ scoreData });
        console.log(scoreData);
      });
    } catch (error) {}
  });

export { router as userRouter };
