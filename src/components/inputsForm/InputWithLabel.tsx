"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type Props<S> = {
  nameInSchema: keyof S & string;
  fieldTitle: string;
  castToNumber?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputWithLabel<S>({
  nameInSchema,
  fieldTitle,
  castToNumber = false,
  ...props
}: Props<S>) {
  const form = useFormContext();
  // const fieldValue = form.watch(nameInSchema);
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{fieldTitle}</FormLabel>
          <FormControl>
            <Input
              {...field}
              {...props}
              onChange={(e) => {
                const raw = e.target.value;
                console.log(raw);

                const numberPattern = /^(0|[1-9]\d*)(\.\d+)?$/;
                if (castToNumber) {
                  if (numberPattern.test(raw)) {
                    field.onChange(Number(raw));
                  }
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
