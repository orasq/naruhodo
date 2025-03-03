import {
  emailValidation,
  passwordValidation,
} from "@/lib/utils/schemaValidation";
import { z } from "zod";

export const loginValidationSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export type LoginFormData = z.infer<typeof loginValidationSchema>;
