import { Router } from "express";
import { getFullReportController } from "../controllers/report.controller";


export const reportRouter: Router = Router();
reportRouter.use("/report", reportRouter);

reportRouter.get("/:id", getFullReportController);
