"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // Đây là Textarea từ shadcn
import { TextareaHTMLAttributes } from "react";

type Props<S> = {
  nameInSchema: keyof S & string;
  fieldTitle: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaWithLabel<S>({
  nameInSchema,
  fieldTitle,
  ...props
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <Textarea {...field} {...props} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
