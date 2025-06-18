import { db } from "@/db";
import { categories, expenses } from "@/db/schema";
import { and, eq, gte, lt, sql } from "drizzle-orm";

export async function getTotalExpenseThisMonth(userId: string | undefined) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  // Chuyển sang chuỗi ngày yyyy-mm-dd để tránh lệch timezone
  const start = startOfMonth.toISOString().slice(0, 10); // '2025-06-01'
  const end = endOfMonth.toISOString().slice(0, 10); // '2025-06-30'

  const result = await db
    .select({
      total: sql<number>`SUM(${expenses.price})`,
    })
    .from(expenses)
    .where(
      sql`(${expenses.userId} = ${userId}) AND (${expenses.date} >= ${start}) AND (${expenses.date}<= ${end})`
    );

  return result[0].total;
}

export async function getUserTotalExpenseThisMonthByCategory(userId: string) {
  const now = new Date();

  // Ngày đầu tháng (ví dụ: 2025-06-01)
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Ngày đầu tháng kế tiếp (ví dụ: 2025-07-01)
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Format: 'YYYY-MM-DD'
  const start = startOfMonth.toISOString().split("T")[0];
  const end = startOfNextMonth.toISOString().split("T")[0];

  const result = await db
    .select({
      categoryId: categories.id,
      categoryName: categories.name,
      total: sql`SUM(${expenses.price})`.as("total"),
    })
    .from(expenses)
    .leftJoin(categories, eq(expenses.categoryId, categories.id))
    .where(
      and(
        eq(expenses.userId, userId),
        gte(expenses.date, start),
        lt(expenses.date, end)
      )
    )
    .groupBy(categories.id, categories.name);

  return result;
}
