import axios from "axios";

export async function fetchExpenseSummary() {
  const res = await axios.get("/api/expenses/summary");
  console.log(res.data);
  return res.data;
}
