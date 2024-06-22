import * as z from "zod";

export const DeliverySchema = z.object({
  delivery_type: z
    .string()
    .min(3, { message: "Delivery type must be at least 3 characters long" })
    .max(200, { message: "Delivery type  must be max 200 characters long" }),
  display_name: z
    .string()
    .min(5, { message: "Display name must be at least 5 characters long" })
    .max(50, { message: "Display name must be max 50 characters long" }),
  delivery_cost: z.coerce
    .number({ invalid_type_error: "Delivery cost must be a number" })
    .multipleOf(0.01)
    .positive({ message: "Delivery cost must be a positive number" }),
  status: z.string(),
});
