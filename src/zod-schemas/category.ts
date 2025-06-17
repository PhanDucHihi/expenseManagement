import { categories } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const categorySelectSchema = createSelectSchema(categories);

export const categoryInsertSchema = createInsertSchema(categories).extend({
  name: z.string().min(1, "Name category is required"),
  imageUrl: z.string().min(1, "ImageUrl is required"),
});

export type categorySelectSchemaType = z.infer<typeof categorySelectSchema>;

export type categoryInsertSchemaType = z.infer<typeof categoryInsertSchema>;
