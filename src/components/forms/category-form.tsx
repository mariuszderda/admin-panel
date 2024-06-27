"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CategoryType } from "@/types";
import { CategorySchema } from "@/types/schema/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";

type CategoryFormProps = {
  token: string;
  category?: CategoryType;
};

export const CategoryForm = ({ token, category }: CategoryFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: category ? category.name : "",
      description: category ? category.description : "",
    },
  });

  const onSubmit = async (data: { name: string; description: string }) => {
    const url = category
      ? `${process.env.NEXT_PUBLIC_API_HOST}/categories/${category._id}`
      : `${process.env.NEXT_PUBLIC_API_HOST}/categories`;

    const httpMethod = category ? "PATCH" : "POST";
    try {
      const response = await fetch(url, {
        method: httpMethod,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": `${process.env.NEXT_PUBLIC_API_HOST}`,
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");

      toast.success("Category was created successfully.");
      router.push("/category");
    } catch (e) {
      toast.error("Can't create a category method");
      throw new Error("Can't create a category method");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input placeholder="Laptop" type="text" {...field} />
              </FormControl>
              <FormDescription>This is category name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />{" "}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                This is description of category.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{category ? "Update" : "Create"}</Button>
      </form>
    </FormProvider>
  );
};
