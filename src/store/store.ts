import { create } from "zustand";
import {
  createExpenseFormSlice,
  ExpenseFormSlice,
} from "./slices/expense-form-slice";
import { persist } from "zustand/middleware";

export const useBoundStore = create<ExpenseFormSlice>()(
  persist(
    (...a) => ({
      ...createExpenseFormSlice(...a),
    }),
    {
      name: "formMulti-storage",
      onRehydrateStorage: (state) => {
        console.log("hydration starts");
        // optional
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log("hydration finished");
          }
        };
      },
    }
  )
);
