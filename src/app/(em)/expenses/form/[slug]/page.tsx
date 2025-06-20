import { db } from "@/db";
import ExpenseForm from "./ExpenseForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getExpense } from "@/lib/queries/expense";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export default async function ExpensesFormPage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { expenseId } = await searchParams;

  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user || !user.id) return <div>Unauthorized</div>;

  const categoriesFromDB = await db.query.categories.findMany();

  const categories = categoriesFromDB.map((c) => ({
    id: String(c.id),
    name: c.name,
  }));

  if (slug.toLowerCase() === "new") {
    return <ExpenseForm userId={user.id} data={categories} />;
  }

  if (slug.toLowerCase() === "edit" && expenseId) {
    const expensesFromDB = await getExpense(Number(expenseId), user.id);

    if (!expensesFromDB) return <div>Not found or not authorized</div>;

    return (
      <ExpenseForm
        userId={user.id}
        data={categories}
        expense={expensesFromDB}
      />
    );
  }

  return <div>Invalid URL</div>;
}
