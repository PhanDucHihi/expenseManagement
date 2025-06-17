import { db } from "./index";
import { users, categories, userCategory } from "./schema";
import { nanoid } from "nanoid";

export async function seedData() {
  // Insert users
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        email: "alice@example.com",
        firstName: "Alice",
        lastName: "Nguyen",
        active: true,
      },
      {
        email: "bob@example.com",
        firstName: "Bob",
        lastName: "Tran",
        active: true,
      },
      {
        email: "charlie@example.com",
        firstName: "Charlie",
        lastName: "Le",
        active: true,
      },
      {
        email: "daisy@example.com",
        firstName: "Daisy",
        lastName: "Pham",
        active: true,
      },
      {
        email: "edward@example.com",
        firstName: "Edward",
        lastName: "Hoang",
        active: true,
      },
    ])
    .returning({ id: users.id });

  // Insert categories
  const insertedCategories = await db
    .insert(categories)
    .values([
      {
        name: "Technology",
        imageUrl: "https://example.com/img/tech.jpg",
        slug: nanoid(10),
      },
      {
        name: "Health",
        imageUrl: "https://example.com/img/health.jpg",
        slug: nanoid(10),
      },
      {
        name: "Education",
        imageUrl: "https://example.com/img/edu.jpg",
        slug: nanoid(10),
      },
      {
        name: "Travel",
        imageUrl: "https://example.com/img/travel.jpg",
        slug: nanoid(10),
      },
      {
        name: "Food",
        imageUrl: "https://example.com/img/food.jpg",
        slug: nanoid(10),
      },
    ])
    .returning({ id: categories.id });

  // Insert userCategory (nhiều-nhiều)
  await db.insert(userCategory).values([
    { userId: insertedUsers[0].id, categoryId: insertedCategories[0].id },
    { userId: insertedUsers[0].id, categoryId: insertedCategories[1].id },
    { userId: insertedUsers[1].id, categoryId: insertedCategories[2].id },
    { userId: insertedUsers[2].id, categoryId: insertedCategories[0].id },
    { userId: insertedUsers[2].id, categoryId: insertedCategories[3].id },
    { userId: insertedUsers[3].id, categoryId: insertedCategories[4].id },
    { userId: insertedUsers[4].id, categoryId: insertedCategories[1].id },
  ]);

  console.log("✅ Seed dữ liệu hoàn tất!");
}
