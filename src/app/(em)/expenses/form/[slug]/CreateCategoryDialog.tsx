"use client";

import ImageUploadInput from "@/components/inputsForm/ImageUploadInput";
import InputWithLabel from "@/components/inputsForm/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { IOptionCategories } from "@/interfaces/expenses";

import {
  categoryFormSchema,
  categoryFormSchemaType,
  categoryInsertSchema,
  categoryInsertSchemaType,
} from "@/zod-schemas/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  handleCategoryCreated: (newCategory: IOptionCategories) => void;
};

export function CraeteCategoryDialog({ handleCategoryCreated }: Props) {
  const form = useForm<categoryFormSchemaType>({
    mode: "onChange",
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: categoryFormSchemaType) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("image", data.image);
      const res = await axios.post("/api/upload/category", formData);

      const imageUrl = res.data.secure_url;
      const result = await axios.post("/api/category", {
        name: data.name,
        imageUrl,
      });
      return result.data;
    },
    onSuccess: async (data) => {
      console.log(data, "data here");

      toast.success(data.message);
      form.reset();
      handleCategoryCreated({
        id: String(data.data.id),
        name: data.data.name,
      });
    },
  });

  function onSubmit(data: categoryFormSchemaType) {
    console.log(data);
    mutate(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="destructive">
          New Category +
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Create your new category here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputWithLabel<categoryFormSchemaType>
              nameInSchema="name"
              fieldTitle="Name of category"
            />
            <ImageUploadInput<categoryFormSchemaType>
              nameInSchema="image"
              fieldTitle="Choose   Image"
              className="max-w-[200px]"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button disabled={isPending} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={isPending} type="submit">
                {isPending ? (
                  <LoaderCircle size="icon" className="animate-spin" />
                ) : null}
                {isPending ? "Saving" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
