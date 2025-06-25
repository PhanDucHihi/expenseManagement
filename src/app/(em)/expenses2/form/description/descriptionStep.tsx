"use client";

import { TextAreaWithLabel } from "@/components/inputsForm/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useBoundStore } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TypeOf, z } from "zod";

const descriptionStepSchema = z.object({
  description: z.string().min(1, "Description can not empty"),
});

type descriptionStepSchemaType = z.infer<typeof descriptionStepSchema>;

export default function DescriptionStep() {
  const router = useRouter();
  const { description, setData } = useBoundStore();
  console.log(description, 1);

  const form = useForm<descriptionStepSchemaType>({
    mode: "onChange",
    resolver: zodResolver(descriptionStepSchema),
    defaultValues: {
      description: description || "",
    },
  });
  // console.log(description);

  // const dataFromLocalStorage = localStorage.getItem("formMulti-storage");
  // console.log(dataFromLocalStorage, "here");
  useEffect(() => {
    const dataFromLocalStorage = localStorage.getItem("formMulti-storage");
    const dataFromLocalStorageParsed = JSON.parse(dataFromLocalStorage!);
    form.setValue("description", dataFromLocalStorageParsed.state.description);
    console.log(dataFromLocalStorage, "here");
  }, []);

  const onSubmit = (data: descriptionStepSchemaType) => {
    setData(data);
    router.push("/expenses2/form/price");
  };

  const handleClickPrevious = () => {
    router.push("/expenses2/form/category");
  };

  return (
    <div>
      <div>Description step</div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log(errors)
          )}
        >
          <TextAreaWithLabel<descriptionStepSchemaType>
            nameInSchema="description"
            fieldTitle="Description"
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
