import { Request, Response } from "express";
import { TUserReturn } from "../interfaces/user.interface";
import {
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/user.service";

export const createUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TUserReturn = await createUserService(req.body);

  const formattedUser = {
    ...user,
    createdAt: user.createdAt.toString(),
  };
  return res.status(201).json(formattedUser);
};

export const updateUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;

  const userUp = await updateUserService(req.body, user);

  return res.status(200).json(userUp);
};

export const deleteUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { user } = res.locals;
  await deleteUserService(user);

  return res.status(204).json();
};
