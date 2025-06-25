"use client";

import { SelectWithLabel } from "@/components/inputsForm/SelectWithLabel";
import {
  expenseInsertSchema,
  expenseInsertSchemaType,
} from "@/zod-schemas/expense";
import { IOptionCategories } from "@/interfaces/expenses";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoundStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useRouter } from "next/navigation";

type Props = {
  data: IOptionCategories[];
};

export const categoryIdSchema = z.object({
  categoryId: z.number().int(),
});

type categoryIdSchemaType = z.infer<typeof categoryIdSchema>;

export default function CategoryStep({ data }: Props) {
  const router = useRouter();
  const { categoryId, setData } = useBoundStore();
  console.log(categoryId);

  const form = useForm<categoryIdSchemaType>({
    mode: "onChange",
    resolver: zodResolver(categoryIdSchema),
    defaultValues: { categoryId: Number(data[0].id) },
  });

  const onSubmit = (data: Partial<expenseInsertSchemaType>) => {
    console.log(data);
    setData(data);
    router.push("/expenses2/form/description");
  };
  return (
    <div className="space-y-4">
      <div>CategoryStep</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors)
          )}
          className="space-y-4"
        >
          <SelectWithLabel<expenseInsertSchemaType>
            nameInSchema="categoryId"
            fieldTitle="Select Category"
            data={data}
          />
          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
}
