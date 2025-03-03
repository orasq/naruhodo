import { z } from "zod";
import {
  emailValidation,
  passwordValidation,
} from "@/lib/utils/schemaValidation";

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
