import { z } from "zod";
import { passwordValidation } from "@/lib/types/validation.types";

export const resetPasswordValidationSchema = z
  .object({
    password: passwordValidation,
    confirmPassword: passwordValidation,
    token: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<
  typeof resetPasswordValidationSchema
>;
