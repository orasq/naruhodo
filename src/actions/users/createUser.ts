"use server";

import {
  RegisterFormData,
  registerValidationSchema,
} from "@/components/Form/RegisterForm/RegisterForm.validation";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { resend } from "@/emails";
import { EmailTemplate } from "@/emails/templates/EmailTemplate";
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
  const emailAddress = parsedForm.data?.email;
  const [user] = await findUserByEmail(emailAddress);

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
    email: emailAddress,
    password: hashedPassword,
  });

  // sens confirmation email
  const { data, error } = await resend.emails.send({
    from: "Naruhodo <onboarding@naruhodo.app>",
    to: [emailAddress],
    subject: "Hello world",
    react: EmailTemplate({ firstName: "John" }),
  });

  if (error) {
    console.log({ error });
  } else {
    console.log({ data });
  }
}
