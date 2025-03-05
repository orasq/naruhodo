import { z } from "zod";
import {
  emailValidation,
  passwordValidation,
} from "@/lib/types/validation.types";

export const registerValidationSchema = z
  .object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: passwordValidation,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerValidationSchema>;
