import { relations } from "drizzle-orm/relations";
import { categories, userCategory, users } from "./schema";

export const userCategoryRelations = relations(userCategory, ({one}) => ({
	category: one(categories, {
		fields: [userCategory.categoryId],
		references: [categories.id]
	}),
	user: one(users, {
		fields: [userCategory.userId],
		references: [users.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	userCategories: many(userCategory),
}));

export const usersRelations = relations(users, ({many}) => ({
	userCategories: many(userCategory),
}));