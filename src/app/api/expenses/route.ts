import { expenseInsertSchema } from "@/zod-schemas/expense";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { expenses } from "@/db/schema";
import { ApiResponse } from "@/interfaces/response";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body, ": hereeeeeeBody");
  body.date = new Date(body.date);
  //   console.log("body.date:", body.date);
  console.log("typeof body.date:", typeof body.date);

  // validate body với zod schema;
  const parsed = expenseInsertSchema.safeParse(body);
  console.log(parsed, ": hereeeeeeee");

  // nếu lỗi validation thì trả về lỗi chi tiết
  if (!parsed.success) {
    console.error("Zod validation error:", parsed.error);
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }

  await db.insert(expenses).values({
    ...parsed.data,
    price: parsed.data.price.toFixed(2),
    date: parsed.data.date.toISOString().split("T")[0],
  });

  return NextResponse.json<ApiResponse>(
    { success: true, message: "Created SuccessFully" },
    { status: 201 }
  );
}
