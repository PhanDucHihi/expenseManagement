/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery } from "@tanstack/react-query";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { fetchExpenseSummary } from "@/lib/api/fetchExpenseSummary";
import Loading from "@/components/Loading";

export function ChartPieLegend() {
  const { user } = useKindeBrowserClient();

  const userId = user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["expenseSummary", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is undefined");
      return fetchExpenseSummary();
    },
    enabled: !!userId,
  });

  if (isLoading) return <Loading size="h-10 w-10" />;
  if (error) return <p>Error: {(error as Error).message}</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data?.map((item: any) => (
        <div
          key={item.categoryId}
          className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-4 flex flex-col gap-2"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {item.categoryName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Tổng chi tiêu:
          </p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {item.total.toLocaleString()}₫
          </p>
        </div>
      ))}
    </div>
  );
}
