import { validators } from "tailwind-merge";
import * as z from "zod";

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/;

export const CustomerSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" })
    .max(200, { message: "First name  must be max 50 characters long" }),
  last_name: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .max(50, { message: "Last name must be max 50 characters long" }),
  email: z.string().email(),
  telephone: z.string().min(10).max(14).regex(phoneRegex, "Invalid number!"),
  delivery: z.object({
    street_and_number: z.string(),
    city: z.string(),
    zip_code: z
      .string()
      .min(6, "Type zip code in format 00-000")
      .max(6, "Type zip code in format 00-000"),
  }),
});
