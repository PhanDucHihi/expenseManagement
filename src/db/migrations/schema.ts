import { pgTable, index, uniqueIndex, unique, integer, varchar, timestamp, boolean, foreignKey, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const categories = pgTable("categories", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "categories_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	name: varchar({ length: 100 }).notNull(),
	imageUrl: varchar("image_url").notNull(),
	slug: varchar({ length: 100 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	index("categories_name_idx").using("btree", table.name.asc().nullsLast().op("text_ops")),
	uniqueIndex("slug_idx").using("btree", table.slug.asc().nullsLast().op("text_ops")),
	unique("categories_name_unique").on(table.name),
	unique("categories_slug_unique").on(table.slug),
]);

export const users = pgTable("users", {
	id: varchar().primaryKey().notNull(),
	email: varchar().notNull(),
	firstName: varchar("first_name", { length: 256 }),
	lastName: varchar("last_name", { length: 256 }),
	active: boolean().default(true).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
}, (table) => [
	uniqueIndex("email_idx").using("btree", table.email.asc().nullsLast().op("text_ops")),
	index("users_first_name_idx").using("btree", table.firstName.asc().nullsLast().op("text_ops")),
	unique("users_email_unique").on(table.email),
]);

export const userCategory = pgTable("user_category", {
	userId: varchar("user_id").notNull(),
	categoryId: integer("category_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [categories.id],
			name: "user_category_category_id_categories_id_fk"
		}),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "user_category_user_id_users_id_fk"
		}),
	primaryKey({ columns: [table.userId, table.categoryId], name: "user_category_user_id_category_id_pk"}),
]);
