import { env } from "process";
import dotenv from "dotenv";
dotenv.config();
// const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

const PORT = env.PORT || 4000;

export default { PORT };
