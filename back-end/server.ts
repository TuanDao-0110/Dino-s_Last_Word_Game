// import express, { Response, Request } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import unknowEndpoint from "./errorhandlder/unknowEndpoint";
import { welcomeRouter } from "./routes/welcome";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
// 1.middleware
app.use(cors());
app.use(express.json());
app.use(morgan(":method :url :status :response-time ms "));
// 2.
app.use(express.static("build"));

app.use(welcomeRouter);
// 3.
app.use(unknowEndpoint);
app.listen(PORT, () => {
  console.log(`listeng at ${PORT}....`);
});
