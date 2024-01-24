import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import User from "../entities/users.entity";
import { createUserSchema, userLoginSchema, userReturnSchema } from "../schemas/user.schema";

export type TUserCreate = z.infer<typeof createUserSchema>;
export type TUserBodyUpdate = Omit<TUserCreate, "admin">;
export type TUserUpdate = DeepPartial<TUserBodyUpdate>;
export type TUserReturn = z.infer<typeof userReturnSchema>;
export type TUserReadReturn = TUserReturn[];
export type TUserLogin = z.infer<typeof userLoginSchema>;
export type TLoginReturn = { token: string };
export type TUserRepository = Repository<User>;