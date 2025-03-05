import { z } from "zod";

export const emailValidation = z
  .string()
  .email("Please enter a valid email address")
  .trim();

export const passwordValidation = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .trim();
