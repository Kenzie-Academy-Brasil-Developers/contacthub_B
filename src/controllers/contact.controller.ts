import { NextFunction, Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  readAllContactsService,
  readContacSpecificService,
  updateContactService,
} from "../services/contact.service";

export const createContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const userId = res.locals.userId;

  const newContact = await createContactService(req.body, userId);
  return res.status(201).json(newContact);
};

export const readContacSpecificController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const contactId: number = Number(req.params.id);
  const contact = await readContacSpecificService(contactId);

  return res.status(200).json(contact);
};

export const readAllContactController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const userId = res.locals.userId;

  const contact = await readAllContactsService(userId);

  return res.status(200).json(contact);
};

export const updateContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: number = Number(req.params.id);

  const contact = await updateContactService(req.body, contactId);

  return res.status(200).json(contact);
};

export const deleteContactController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const contactId: number = Number(req.params.id);
  await deleteContactService(contactId);

  return res.status(204).json(contactId);
};
