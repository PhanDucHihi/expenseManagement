import { db } from "@/db";
import { users } from "@/db/schema";

export async function test() {
  const user = await db.select().from(users);
  return user;
}
