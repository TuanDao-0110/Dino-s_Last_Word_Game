import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { welcomeRouter } from "./routes/welcome";
import { wordRouter } from "./routes/word";
import { userRouter } from "./routes/user";
import { checkToken, unknowEndpoint, errorHandler } from "./utils/middleware";


const app = express();

// 1.middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan(":method :url :status :response-time ms "));
app.use(express.static("build"));

app.use(welcomeRouter);
app.use("/api/word", wordRouter);
app.use("/api/user", checkToken, userRouter);
app.use(unknowEndpoint);
app.use(errorHandler);
// 3.

export default app;
