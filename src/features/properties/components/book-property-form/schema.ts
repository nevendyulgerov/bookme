import * as z from "zod";
import { isObject } from "lodash";

export const schema = z.object({
  duration: z
    .object(
      {
        from: z.date().optional(),
        to: z.date({ error: "" }).optional(),
      },
      {
        error: () => "At least one day is required",
      },
    )
    .refine((val) => isObject(val?.from), "At least one day is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Valid email is required").max(254),
  phoneNumber: z.string().min(1, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  numberAdults: z.string().min(1, "Number of adults is required"),
  numberChildren: z.string().min(1, "Number of children is required"),
  confirmation: z.boolean().refine((val) => val, "Confirmation is required"),
});
