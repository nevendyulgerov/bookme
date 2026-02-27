import * as z from "zod";

export const schema = z.object({
  email: z.email("Valid email is required").max(254),
});
