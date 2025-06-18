import { expenses } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const expenseSelectSchema = createSelectSchema(expenses);

export const expenseInsertSchema = createInsertSchema(expenses).extend({
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description cannot be empty"),
  datedate: z.coerce.date().refine((d) => d <= new Date(), {
    message: "Date cannot be in the future",
  }),
});

export type expenseSelectSchemaType = z.infer<typeof expenseSelectSchema>;

export type expenseInsertSchemaType = z.infer<typeof expenseInsertSchema>;
