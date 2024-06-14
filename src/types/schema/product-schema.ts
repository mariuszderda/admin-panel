import * as z from "zod";

export const ProductSchema = z.object({
  name: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(200, { message: "Title must be max 200 characters long" }),
  reference: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" })
    .max(50, { message: "Title must be max 50 characters long" }),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .multipleOf(0.01)
    .positive({ message: "Price must be a positive number" }),
  stock: z.coerce
    .number({ invalid_type_error: "Stock must be a number" })
    .positive({ message: "Stock must be a positive number" }),
  description: z.string(),
  category: z.string(),
});
