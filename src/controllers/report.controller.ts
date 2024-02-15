import { NextFunction, Request, Response } from 'express';
import { generateFullReportService } from '../services/report.service';


export const getFullReportController = async (req: Request, res: Response, next: NextFunction) => {
    const userId = res.locals.userId;

    const report = await generateFullReportService(userId);
    res.status(200).json(report);
  
};
