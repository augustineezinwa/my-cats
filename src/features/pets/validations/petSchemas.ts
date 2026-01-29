import { z } from "zod";

export const createPetSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  age: z.number().int().nonnegative().optional(),
});

export const updatePetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  age: z.number().int().nonnegative().optional(),
});
