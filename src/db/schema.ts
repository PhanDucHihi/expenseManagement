import {
  pgTable as table,
  primaryKey,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import timestamps from "./helper";
import { nanoid } from "nanoid";
import { relations } from "drizzle-orm";

export const users = table(
  "users",
  {
    id: t.varchar().primaryKey(),
    email: t.varchar().notNull().unique(),
    firstName: t.varchar("first_name", { length: 256 }),
    lastName: t.varchar("last_name", { length: 256 }),
    active: t.boolean("active").notNull().default(true),
    ...timestamps,
  },
  (t) => [
    index("users_first_name_idx").on(t.firstName),
    uniqueIndex("email_idx").on(t.email),
  ]
);

export const usersRelations = relations(users, ({ many }) => ({
  userCategory: many(userCategory),
}));

export const categories = table(
  "categories",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar("name", { length: 100 }).notNull().unique(),
    imageUrl: t.varchar("image_url").notNull(),
    slug: t
      .varchar("slug", { length: 100 })
      .notNull()
      .unique()
      .$default(() => nanoid(10)),
    ...timestamps,
  },
  (t) => [
    index("categories_name_idx").on(t.name),
    uniqueIndex("slug_idx").on(t.slug),
  ]
);

export const categoriesRelations = relations(categories, ({ many }) => ({
  userCategory: many(userCategory),
}));

export const userCategory = table(
  "user_category",
  {
    userId: t.varchar("user_id").references(() => users.id),
    categoryId: t.integer("category_id").references(() => categories.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.categoryId] })]
);
