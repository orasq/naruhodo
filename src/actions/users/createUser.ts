"use server";

import {
  RegisterFormData,
  registerValidationSchema,
} from "@/components/Form/RegisterForm/RegisterForm.validation";
import { db } from "@/db";
import { activeToken, users } from "@/db/schema/users";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { resend } from "@/emails";
import { AuthEmailTemplate } from "@/emails/templates/AuthEmailTemplate";
import generateToken from "@/lib/utils/functions/generateToken";
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

  // create validation token
  const token = generateToken();

  // create transaction to create both the user and the activeToken
  // if one of the two fails, we don't want the other to go through either
  try {
    db.transaction(async (tx) => {
      // insert the user into the database
      const userId = crypto.randomUUID();
      const hashedPassword = await hashPassword(parsedForm.data.password);

      await tx.insert(users).values({
        id: userId ?? "",
        email: emailAddress,
        password: hashedPassword,
      });

      await tx.insert(activeToken).values({
        token,
        userId,
      });
    });
  } catch {
    return {
      errors: { general: "An error occurred. Please try again later." },
    };
  }

  // send confirmation email
  const { data: resendData, error } = await resend.emails.send({
    from: "Naruhodo <account@naruhodo.app>",
    to: [emailAddress],
    subject: "Verify your email address",
    react: AuthEmailTemplate({
      titleText: "Verify your email address",
      mainText: `In order to start using your account, you need to confirm your email.`,
      button: {
        label: "Confirm your email address",
        href: `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm/${token}`,
      },
      bottomText:
        "If you didn't sign up for this account, please ignore this email.",
    }),
  });

  if (error) {
    return { errors: { general: "An error occured. Please retry later." } };
  }

  return { success: true };
}
