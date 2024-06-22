import * as z from "zod";

export const PaymentSchema = z.object({
  payment_type: z
    .string()
    .min(4, { message: "Payment type must be at least 5 characters long" })
    .max(200, { message: "Payment type  must be max 200 characters long" }),
  display_name: z
    .string()
    .min(5, { message: "Display name must be at least 5 characters long" })
    .max(50, { message: "Display name must be max 50 characters long" }),
  status: z.string(),
});
