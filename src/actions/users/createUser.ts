"use server";

import {
  RegisterFormData,
  registerValidationSchema,
} from "@/components/Form/RegisterForm/RegisterForm.validation";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import {
  hashPassword,
  verifyHashedPassword,
} from "@/lib/utils/functions/hashPassword";
import { eq } from "drizzle-orm";

export async function createUser(formData: FormData) {
  const form = Object.fromEntries(formData.entries()) as RegisterFormData;

  // validate the form data
  const parsedForm = registerValidationSchema.safeParse(form);

  if (!parsedForm.success) {
    console.log("parsing error");
    return;
    // return {
    //   formData: form,
    //   errors: parsedForm.error.flatten().fieldErrors,
    // };
  }

  // check if email is already in use
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, parsedForm.data.email));

  if (user) {
    console.log("email already in use");
    return;
  }

  // insert the user into the database
  const hashedPassword = await hashPassword(parsedForm.data.password);
  console.log({ hashedPassword });

  const verified = await verifyHashedPassword(
    hashedPassword!,
    parsedForm.data.password,
  );
  console.log({ verified });
  // await db.insert(users).values({
  //   id: crypto.randomUUID(),
  //   email: formData.get("email"),
  //   password: formData.get("password"),
  // });
}
