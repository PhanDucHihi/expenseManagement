"use client";

import { DatePickerWithLabel } from "@/components/inputsForm/DatePickerWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useBoundStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dateStepSchema = z.object({
  date: z.date().refine((d) => d <= new Date(), {
    message: "Date cannot be in the future",
  }),
});

type dateStepSchemaType = z.infer<typeof dateStepSchema>;

export default function DateStep() {
  const { date, description, categoryId, price, setData } = useBoundStore();
  const router = useRouter();

  console.log(description);
  const form = useForm<dateStepSchemaType>({
    mode: "onChange",
    resolver: zodResolver(dateStepSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmit = (data: dateStepSchemaType) => {
    setData(data);
    console.log({ date, description, categoryId, price });
  };

  const handleClickPrevious = () => {
    router.push("/expenses2/form/price");
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <DatePickerWithLabel<dateStepSchemaType>
            nameInSchema="date"
            fieldTitle="Pick a date"
          />
          <Button type="button" onClick={handleClickPrevious}>
            Previous
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div>Date step</div>
    </div>
  );
}
