import { NextFunction, Request, Response } from "express";
import User from "../entities/users.entity";
import { AppError } from "../errors/AppError";
import { userRepository } from "../repositories";

export const checkingUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const user: User | null = await userRepository.findOneBy({ email });

  if (user) throw new AppError("Email already exists", 409);

  return next();
};

export const checkingUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  const user: User | null = await userRepository.findOneBy({ id: Number(id) });

  if (!user) throw new AppError("User not found", 404);

  res.locals = { ...res.locals, user };

  return next();
};