"use client";

import { z } from "zod";

import { useRouter } from "next/navigation";
import { useBoundStore } from "@/store/store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputWithLabel from "@/components/inputsForm/InputWithLabel";
import { Button } from "@/components/ui/button";

const priceStepSchema = z.object({
  price: z.number().gt(0, "Price have to > 0"),
});

type priceStepSchemaType = z.infer<typeof priceStepSchema>;
export default function PriceStep() {
  const router = useRouter();
  const { price, setData } = useBoundStore();
  console.log(price);

  const form = useForm<priceStepSchemaType>({
    mode: "onChange",
    resolver: zodResolver(priceStepSchema),
    defaultValues: {
      price: 0,
    },
  });

  const onSubmit = (data: priceStepSchemaType) => {
    setData(data);
    router.push("/expenses2/form/date");
  };

  const handleClickPrevious = () => {
    router.push("/expenses2/form/description");
  };

  return (
    <div>
      <div>Price step</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <InputWithLabel<priceStepSchemaType>
            nameInSchema="price"
            fieldTitle="Price"
            castToNumber={true}
          />
          <Button type="button" onClick={handleClickPrevious}>
            Previous
          </Button>
          <Button type="submit">Next</Button>
        </form>
      </Form>
    </div>
  );
}
