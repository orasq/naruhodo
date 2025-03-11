"use server";

import {
  RegisterFormData,
  registerValidationSchema,
} from "@/components/Form/RegisterForm/RegisterForm.validation";
import { db } from "@/db";
import { activeToken, users } from "@/db/schema/users";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { resend } from "@/emails";
import { EmailTemplate } from "@/emails/templates/EmailTemplate";
import { hashPassword } from "@/lib/utils/functions/hashPassword";

type CreateUserState = {
  formData?: RegisterFormData;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
    general?: string;
  };
  success?: boolean;
};

export async function createUser(
  _: CreateUserState,
  data: FormData,
): Promise<CreateUserState> {
  const formData = Object.fromEntries(data.entries()) as RegisterFormData;

  // validate the form data
  const parsedForm = registerValidationSchema.safeParse(formData);

  if (!parsedForm.success) {
    return {
      formData,
      errors: parsedForm.error.flatten().fieldErrors,
    };
  }

  // check if email is already in use
  const emailAddress = parsedForm.data?.email;
  const [user] = await findUserByEmail(emailAddress);

  if (user) {
    return {
      formData,
      errors: { email: ["This email is already in use"] },
    };
  }

  // insert the user into the database
  const userId = crypto.randomUUID();
  const hashedPassword = await hashPassword(parsedForm.data.password);

  await db.insert(users).values({
    id: userId,
    email: emailAddress,
    password: hashedPassword,
  });

  // create validation token
  const token = `${crypto.randomUUID()}`.replace(/-/g, "");

  await db.insert(activeToken).values({
    token,
    userId,
  });

  // sens confirmation email
  const { data: resendData, error } = await resend.emails.send({
    from: "Naruhodo <onboarding@naruhodo.app>",
    to: [emailAddress],
    subject: "Please activate your account",
    react: EmailTemplate({ emailAddress, token }),
  });

  if (error) {
    return { errors: { general: "An error occured. Please retry later." } };
  }

  return { success: true };
}
