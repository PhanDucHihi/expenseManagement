import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
// import { config } from "dotenv";
import "dotenv/config";

// if (process.env.NODE_ENV === "development") {
//   config({ path: ".env.local" });
// }

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql, casing: "snake_case" });

export { db };
