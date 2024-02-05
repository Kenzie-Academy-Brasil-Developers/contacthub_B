import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

export const checkingBody =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    req.body = schema.parse(req.body);

    return next();
  };

export const checkingToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerTokenData = req.headers.authorization;
  if (!headerTokenData) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const [_, token] = headerTokenData.split(" ");

  verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
    res.locals.userId = decoded.sub;
    res.locals.admin = decoded.admin;
    return next();
  });
};

export const checkingAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { admin } = res.locals;

  if (!admin) throw new AppError("Insufficient permission", 403);

  return next();
};
