"use server";

import {
  ForgotPasswordFormData,
  forgotPasswordValidationSchema,
} from "@/components/Form/ForgotPasswordForm/ForgotPasswordForm.validation";
import { db } from "@/db";
import { passwordResetToken } from "@/db/schema/users";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { resend } from "@/emails";
import { AuthEmailTemplate } from "@/emails/templates/AuthEmailTemplate";
import generateToken from "@/lib/utils/functions/generateToken";

type ForgotPasswordState = {
  formData?: ForgotPasswordFormData;
  errors?: {
    email?: string[] | undefined;
    general?: string;
  };
  success?: boolean;
};

export async function forgotPassword(
  _: ForgotPasswordState,
  data: FormData,
): Promise<ForgotPasswordState> {
  const formData = Object.fromEntries(data.entries()) as ForgotPasswordFormData;

  // validate the form data
  const parsedForm = forgotPasswordValidationSchema.safeParse(formData);

  if (!parsedForm.success) {
    return {
      formData,
      errors: parsedForm.error.flatten().fieldErrors,
    };
  }

  // check if email exists
  const emailAddress = parsedForm.data?.email;
  const [user] = await findUserByEmail(emailAddress);

  if (!user) {
    return {
      formData,
      errors: { email: ["This email is not registered"] },
    };
  }

  // create validation token
  const token = generateToken();

  await db.insert(passwordResetToken).values({
    token,
    userId: user.id,
  });

  // send reset password email
  const { data: resendData, error } = await resend.emails.send({
    from: "Naruhodo <account@naruhodo.app>",
    to: [emailAddress],
    subject: "Reset your password",
    react: AuthEmailTemplate({
      titleText: "Reset your password",
      mainText:
        "Looks like you lost your password.<br />Click on the button below to change your password.",
      button: {
        label: "Change my password",
        href: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password/${token}`,
      },
      bottomText:
        "If you didn't ask to reset your password, please ignore this email.",
    }),
  });

  if (error) {
    return { errors: { general: "An error occured. Please retry later." } };
  }

  return { success: true };
}
