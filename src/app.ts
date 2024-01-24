import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';

const app = express();
app.use(express.json());
// app.use("/", routes);
// app.use(handleErrors);
export default app;