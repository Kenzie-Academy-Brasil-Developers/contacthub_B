import { Request, Response } from "express";
import { loginService } from "../services/login.service";

export const loginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { email, password } = req.body;

  const token = await loginService({ email, password });
  return res.status(200).json(token);
};
