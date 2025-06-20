import { expenseInsertSchemaType } from "@/zod-schemas/expense";
import axios from "axios";

export async function insertExpense(data: expenseInsertSchemaType) {
  const res = await axios.post("/api/expenses", data);
  return res;
}
