import { NextFunction, Request, Response } from "express";
import Contact from "../entities/contacts.entity";
import { contactRepository } from "../repositories";
import { AppError } from "../errors/AppError";

export const checkingContactName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;
  const contact: Contact | null = await contactRepository.findOneBy({ name });

  if (contact) throw new AppError("Name already exists", 409);

  return next();
};

export const checkingContactEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const contact: Contact | null = await contactRepository.findOneBy({ email });

  if (contact) throw new AppError("Email already exists", 409);

  return next();
};

export const checkingContactPhone = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { contactNumber } = req.body;
  const contact: Contact | null = await contactRepository.findOneBy({
    contactNumber,
  });

  if (contact) throw new AppError("Contact phone already exists", 409);

  return next();
};
