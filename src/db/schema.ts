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

// 1. Định nghĩa bảng users
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

// 2. Định nghĩa bảng categories
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

// 3. Định nghĩa bảng userCategory
export const userCategory = table(
  "user_category",
  {
    userId: t
      .varchar("user_id")
      .notNull()
      .references(() => users.id),
    categoryId: t
      .integer("category_id")
      .notNull()
      .references(() => categories.id),
  },
  (t) => [primaryKey({ columns: [t.userId, t.categoryId] })]
);

export const expenses = table("expenses", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: t
    .varchar("user_id")
    .notNull()
    .references(() => users.id),
  categoryId: t
    .integer("category_id")
    .notNull()
    .references(() => categories.id),
  price: t.numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: t.text("description"),
  date: t.date("date").notNull().defaultNow(),
  ...timestamps,
});

// 4. Bây giờ mới tới relations sau khi tất cả bảng đã có
export const usersRelations = relations(users, ({ many }) => ({
  userCategory: many(userCategory),
  expenses: many(expenses),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  userCategory: many(userCategory),
  expenses: many(expenses),
}));

export const userCategoryRelations = relations(userCategory, ({ one }) => ({
  user: one(users, {
    fields: [userCategory.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [userCategory.categoryId],
    references: [categories.id],
  }),
}));

export const expenseRelations = relations(expenses, ({ one }) => ({
  user: one(users, {
    fields: [expenses.userId],
    references: [users.id],
  }),
  category: one(categories, {
    fields: [expenses.categoryId],
    references: [categories.id],
  }),
}));

// 5. Cuối cùng export schema
export const schema = {
  users,
  categories,
  userCategory,
  expenses,
  usersRelations,
  categoriesRelations,
  userCategoryRelations,
  expenseRelations,
};
