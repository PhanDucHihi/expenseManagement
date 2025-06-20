"use client";
import {
  expenseInsertSchema,
  expenseInsertSchemaType,
  expenseSelectSchemaType,
} from "@/zod-schemas/expense";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SelectWithLabel } from "@/components/inputsForm/SelectWithLabel";
import { IOptionCategories } from "@/interfaces/expenses";
import { TextAreaWithLabel } from "@/components/inputsForm/TextAreaWithLabel";
import InputWithLabel from "@/components/inputsForm/InputWithLabel";
import { DatePickerWithLabel } from "@/components/inputsForm/DatePickerWithLabel";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

type Props = {
  data: IOptionCategories[];
  expense?: expenseSelectSchemaType;
  userId: string;
};

export default function ExpenseForm({ data, expense, userId }: Props) {
  const defaultValues: Partial<expenseInsertSchemaType> = {
    userId: userId,
    categoryId: expense?.categoryId ?? Number(data[0]?.id),
    description: expense?.description ?? "",
    price: Number(expense?.price ?? 0),
    date: expense?.date ? new Date(expense.date) : new Date(),
  };

  const form = useForm<expenseInsertSchemaType>({
    mode: "onChange",
    resolver: zodResolver(expenseInsertSchema),
    defaultValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Partial<expenseInsertSchemaType>) => {
      const res = await axios.post("/api/expenses", data);
      return res.data;
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  function onSubmit(data: expenseInsertSchemaType) {
    const { created_at, updated_at, ...validData } = data;
    console.log(data);
    mutate(validData);
    form.reset();
  }

  console.log(form.formState.isValid);

  return (
    <div className="p-2 py-6 space-y-2">
      <div className="w-full flex flex-col items-center gap-8">
        <h1>{expense ? "Edit Expense" : "Create New Expense"} Form</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, (errors) =>
              console.log(errors)
            )}
            className="space-y-8"
          >
            <div className="flex gap-2 items-end">
              <SelectWithLabel<expenseInsertSchemaType>
                nameInSchema="categoryId"
                fieldTitle="Select Category"
                data={data}
              />
              <Button type="button" variant="destructive">
                New +
              </Button>
            </div>

            <TextAreaWithLabel<expenseInsertSchemaType>
              nameInSchema="description"
              fieldTitle="Description"
            />

            <InputWithLabel<expenseInsertSchemaType>
              nameInSchema="price"
              fieldTitle="Price"
              castToNumber={true}
            />

            <DatePickerWithLabel<expenseInsertSchemaType>
              nameInSchema="date"
              fieldTitle="Date"
            />
            <Button
              disabled={!form.formState.isValid || isPending}
              type="submit"
            >
              {isPending ? "Saving" : "Save"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
