"use server";

import { db } from "@/db";
import { users } from "@/db/schema/users";
import { z } from "zod";

const registerValidationSchema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8).trim(),
    confirmPassword: z.string().min(8).trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function createUser(formData: FormData) {
  console.log({ formData });

  await db.insert(users).values({
    id: crypto.randomUUID(),
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
