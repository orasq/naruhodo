"use server";

import {
  RegisterFormData,
  registerValidationSchema,
} from "@/components/Form/RegisterForm/RegisterForm.validation";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { hashPassword } from "@/lib/utils/functions/hashPassword";

export async function createUser(formData: FormData) {
  const form = Object.fromEntries(formData.entries()) as RegisterFormData;

  // validate the form data
  const parsedForm = registerValidationSchema.safeParse(form);

  if (!parsedForm.success) {
    return {
      formData: form,
      errors: parsedForm.error.flatten().fieldErrors,
    };
  }

  // check if email is already in use
  const [user] = await findUserByEmail(parsedForm.data.email);

  if (user) {
    return {
      formData: form,
      errors: "This email is already in use",
    };
  }

  // insert the user into the database
  const hashedPassword = await hashPassword(parsedForm.data.password);

  await db.insert(users).values({
    id: crypto.randomUUID(),
    email: formData.get("email"),
    password: formData.get("password"),
  });
}
