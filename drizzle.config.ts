import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./src/db/migrations",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://ExpenseManagement_owner:npg_rYSkEn3OM9pD@ep-holy-sun-a8jla4oa-pooler.eastus2.azure.neon.tech/ExpenseManagement?sslmode=require",
  },
});
