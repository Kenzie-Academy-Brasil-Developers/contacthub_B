import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { routes } from "./routes/index.routes";
import { handleErrors } from "./middlewares/handleErrors";

const app = express();

app.use(express.json());
app.use("/", routes);
app.use(handleErrors);

export default app;
