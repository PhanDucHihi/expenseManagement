import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTotalExpenseThisMonth } from "@/lib/queries/expense";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ChartPieLegend } from "./(component)/PieChart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function DashBoard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const totalThisMonth = await getTotalExpenseThisMonth(user?.id);
  return (
    <>
      <div className="w-full min-h-screen p-2 py-4">
        <div className="space-y-6 flex flex-col items-center">
          <div className="text-6xl text-blue-100 flex justify-center">
            Dashboard
          </div>

          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Total This Month:</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold px-2">{totalThisMonth}</p>
            </CardContent>
          </Card>

          <ChartPieLegend />
          <Button>
            <Link href="/expenses/form/new">Add new Expense</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
