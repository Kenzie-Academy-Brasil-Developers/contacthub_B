import { z } from "zod";
import { Repository } from "typeorm";
import { createNewContactSchema } from "../schemas/contact.schema";
import Contact from "../entities/contacts.entity";

export type TCreateContact = z.infer<typeof createNewContactSchema>;
export type TContactRepository = Repository<Contact>;