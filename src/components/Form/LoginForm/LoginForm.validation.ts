import {
  emailValidation,
  passwordValidation,
} from "@/lib/types/validation.types";
import { z } from "zod";

export const loginValidationSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;
