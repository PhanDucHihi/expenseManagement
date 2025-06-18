import { db } from "@/db";
import { users } from "@/db/schema";
import { userInsertSchemaType } from "@/zod-schemas/user";
import { eq } from "drizzle-orm";

export async function findUserById(kindId: string) {
  return db.query.users.findFirst({
    where: eq(users.id, kindId),
  });
}

export async function createUser({
  id,
  email,
  firstName,
  lastName,
}: userInsertSchemaType) {
  return db.insert(users).values({
    id,
    email,
    firstName,
    lastName,
  });
}
