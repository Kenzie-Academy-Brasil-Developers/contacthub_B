import { z } from "zod";

export const contactSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().max(45),
    email: z.string().max(45).email(),
    contactNumber: z.number().max(15),
    createdAt: z.string(),
    userId: z.number().int().positive(),
})

export const createNewContactSchema = contactSchema.omit({
    id: true,
    userId: true,
});