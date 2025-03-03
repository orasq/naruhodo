import { z } from "zod";

export const emailValidation = z.string().email().trim();

export const passwordValidation = z.string().min(8).trim();
