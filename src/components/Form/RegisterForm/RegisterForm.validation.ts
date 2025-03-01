import { z } from "zod";

export const registerValidationSchema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8).trim(),
    confirmPassword: z.string().min(8).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerValidationSchema>;
