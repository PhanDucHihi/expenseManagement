/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { InputHTMLAttributes, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props<S> = {
  nameInSchema: keyof S & string;
  fieldTitle: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function ImageUploadInput<S>({
  nameInSchema,
  fieldTitle,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext();
  const file = form.watch(nameInSchema);
  const [previewImage, setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewImage("");
    }
  }, [file]);
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
              type="file"
              className={className}
              name={field.name}
              onBlur={field.onBlur}
              ref={field.ref}
              onChange={(e) => {
                const selected = e.target.files?.[0];
                if (selected) {
                  form.setValue(nameInSchema as any, selected as File, {
                    shouldValidate: true,
                  });
                }
              }}
            />
          </FormControl>
          {previewImage && (
            <Image
              src={previewImage}
              alt="Preview"
              className="w-40 h-40 rounded-md mt-2 object-cover"
              width={160}
              height={160}
            />
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
