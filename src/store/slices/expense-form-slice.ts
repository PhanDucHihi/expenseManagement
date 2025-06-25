import { expenseInsertSchemaType } from "@/zod-schemas/expense";
import { create, StateCreator } from "zustand";

export type ExpenseFormSlice = Partial<expenseInsertSchemaType> & {
  setData: (data: Partial<expenseInsertSchemaType>) => void;
  currentStep: number;
};

export const createExpenseFormSlice: StateCreator<
  ExpenseFormSlice,
  [],
  [],
  ExpenseFormSlice
> = (set) => ({
  setData: (data) => set(data),
  categoryId: 0,
  description: "",
  price: 0,
  date: new Date(),
  currentStep: 1,
});
