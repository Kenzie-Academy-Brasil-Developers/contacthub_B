import { z } from "zod";
import User from "../entities/users.entity";

export const contactSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().max(45),
  email: z.string().max(45).email(),
  contactNumber: z.number(),
  createdAt: z.string(),
  user: z.instanceof(User),
});

export const createNewContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  user: true,
});
export const contactUpdateSchema = createNewContactSchema.partial();
export const contactReadSchema = contactSchema.array();
export const contactReturnSchema = contactSchema.omit({ user: true });
