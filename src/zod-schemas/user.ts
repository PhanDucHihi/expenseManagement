import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { users } from "@/db/schema";
import { z } from "zod/v4";

export const userSelectSchema = createSelectSchema(users);

export const userInsertSchema = createInsertSchema(users).extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email({ message: "Invalid email address" }),
});

export type userSelectSchemaType = z.infer<typeof userSelectSchema>;

export type userInsertSchemaType = z.infer<typeof userInsertSchema>;
