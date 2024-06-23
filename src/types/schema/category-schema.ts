import * as z from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "Category name must be at least 3 characters long" })
    .max(50, { message: "Category name  must be max 50 characters long" }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long" })
    .max(500, { message: "Description name must be max 500 characters long" }),
});
