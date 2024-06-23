import * as z from "zod";

export const OrderSchema = z.object({
  customer: z.string({ message: "Select a customer." }),
  delivery_method: z.string({ message: "Select a delivery method" }),
  payment_method: z.string({ message: "Select a payment method" }),
});
