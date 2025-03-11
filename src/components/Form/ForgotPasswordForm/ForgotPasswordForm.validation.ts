import { z } from "zod";
import { emailValidation } from "@/lib/types/validation.types";

export const forgotPasswordValidationSchema = z.object({
  email: emailValidation,
});

export type ForgotPasswordFormData = z.infer<
  typeof forgotPasswordValidationSchema
>;
