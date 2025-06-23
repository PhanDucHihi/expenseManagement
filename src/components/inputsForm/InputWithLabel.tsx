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
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function InputWithLabel<S>({
  nameInSchema,
  fieldTitle,
  castToNumber = false,
  className,
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
              placeholder={`Enter ${fieldTitle}`}
              className={`${className}`}
              {...field}
              {...props}
              value={field.value ?? ""}
              onChange={(e) => {
                const raw = e.target.value;

                if (castToNumber) {
                  // Cho phép input trống
                  if (raw === "") {
                    field.onChange(undefined);
                  } else {
                    const numberPattern = /^(0|[1-9]\d*)(\.\d+)?$/;
                    if (numberPattern.test(raw)) {
                      field.onChange(Number(raw));
                    }
                  }
                } else {
                  field.onChange(raw);
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
