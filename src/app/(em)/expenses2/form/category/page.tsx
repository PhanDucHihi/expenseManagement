import CategoryStep from "./categoryStep";
import { db } from "@/db";

export default async function CategoryStepPage() {
  const categoriesFromDB = await db.query.categories.findMany();

  const categories = categoriesFromDB.map((c) => ({
    id: String(c.id),
    name: c.name,
  }));

  return (
    <div>
      <h1>Step 1</h1>
      <CategoryStep data={categories}/>
    </div>
  );
}
