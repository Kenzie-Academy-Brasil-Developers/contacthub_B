import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { handleErrors } from "./middlewares/handleErrors";
import { userRouter } from "./routes/user.routes";
import { loginRouter } from "./routes/login.routes";
import { contactRouter } from "./routes/contact.routes";
import cors from "cors"


const app = express();

app.use(cors())
app.use(express.json());
app.use("/", loginRouter, userRouter, contactRouter);
app.use(handleErrors);

export default app;

