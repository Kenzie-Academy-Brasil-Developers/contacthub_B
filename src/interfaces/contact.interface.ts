import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import {
  contactReadSchema,
  contactReturnSchema,
  contactUpdateSchema,
  createNewContactSchema,
} from "../schemas/contact.schema";
import Contact from "../entities/contacts.entity";

export type TCreateContact = z.infer<typeof createNewContactSchema>;
export type TContactRepository = Repository<Contact>;
export type TReadAllContact = z.infer<typeof contactReadSchema>;
export type TContactUpdate = DeepPartial<typeof contactUpdateSchema>;
export type TContactReturn = z.infer<typeof contactReturnSchema>;
