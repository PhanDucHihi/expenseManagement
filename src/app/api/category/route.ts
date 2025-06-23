import { db } from "@/db";
import { categories, userCategory } from "@/db/schema";
import {
  categoryInsertSchema,
  categorySelectSchemaType,
} from "@/zod-schemas/category";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { ApiResponse } from "@/interfaces/response";
import { expenseInsertSchemaType } from "@/zod-schemas/expense";

export async function GET() {
  const categories = await db.query.categories.findMany();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsed = categoryInsertSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
  }
  try {
    const result = await db.insert(categories).values(parsed.data).returning();

    await db.insert(userCategory).values({ userId, categoryId: result[0].id });

    return NextResponse.json<ApiResponse<categorySelectSchemaType>>(
      {
        success: true,
        message: "Create category successfully",
        data: result[0],
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.log(error);

    // Lỗi khác
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
