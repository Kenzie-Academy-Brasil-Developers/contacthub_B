import { z } from "zod";

export const userSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  contactNumber: z.number(),
  createdAt: z.string(),
});

export const createUserSchema = userSchema.pick({
  name: true,
  email: true,
  password: true,
  contactNumber: true,
  admin: true,
});

export const userAdminSchema = createUserSchema.omit({ admin: true });
export const userUpdateSchema = userAdminSchema.partial();
export const userReturnSchema = userSchema.omit({ password: true });
export const userReturnListSchema = userReturnSchema.array();
export const userReadSchema = userReturnSchema.array();
export const userLoginSchema = userSchema.pick({
  email: true,
  password: true,
});
export const usersSchemaResponse = z.array(userLoginSchema);
