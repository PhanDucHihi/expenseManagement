"use client";

import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IOptionCategories } from "@/interfaces/expenses";

type Props<S> = {
  nameInSchema: keyof S & string;
  fieldTitle: string;
  data: IOptionCategories[];
  disabled?: boolean;
};

export function SelectWithLabel<S>({
  nameInSchema,
  fieldTitle,
  data,
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
            <Select
              onValueChange={(value) => field.onChange(Number(value))}
              value={String(field.value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${fieldTitle}`} />
              </SelectTrigger>
              <SelectContent>
                {data?.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
