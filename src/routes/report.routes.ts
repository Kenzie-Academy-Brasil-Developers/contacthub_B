import { Router } from "express";
import { getFullReportController } from "../controllers/report.controller";
import { checkingToken } from "../middlewares/globals.middlewares";


export const reportRouter: Router = Router();
reportRouter.use("/report", reportRouter);

reportRouter.get("/", checkingToken, getFullReportController);
