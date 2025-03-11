"use server";

import {
  ResetPasswordFormData,
  resetPasswordValidationSchema,
} from "@/components/Form/ResetPasswordForm/ResetPasswordForm.validation";
import { db } from "@/db";
import { passwordResetToken, users } from "@/db/schema/users";
import { hashPassword } from "@/lib/utils/functions/hashPassword";
import { and, eq, isNull } from "drizzle-orm";

export type ResetPasswordState = {
  formData?: ResetPasswordFormData;
  errors?: {
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
    general?: string;
  };
  success?: boolean;
};

export async function resetPassword(
  _: ResetPasswordState,
  data: FormData,
): Promise<ResetPasswordState> {
  const formData = Object.fromEntries(data.entries()) as ResetPasswordFormData;

  // validate the form data
  const parsedForm = resetPasswordValidationSchema.safeParse(formData);

  if (!parsedForm.success) {
    return {
      formData,
      errors: parsedForm.error.flatten().fieldErrors,
    };
  }

  // check if resetToken exist
  const resetToken = await db
    .select()
    .from(passwordResetToken)
    .where(
      and(
        eq(passwordResetToken.token, formData.token ?? ""),
        isNull(passwordResetToken.resetAt),
      ),
    )
    .limit(1);

  if (resetToken.length === 0) {
    return { errors: { general: "Invalid token" } };
  }

  // create transaction to update both the user's password and the resetToken validity
  // if one of the two fails, we don't want the other to go through either
  const hashedPassword = await hashPassword(formData.password);

  try {
    await db.transaction(async (tx) => {
      // update user's password
      await tx
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.id, resetToken[0]?.userId));

      // update token validity
      await tx
        .update(passwordResetToken)
        .set({ resetAt: new Date() })
        .where(eq(passwordResetToken.id, resetToken[0]?.id));
    });

    return { success: true };
  } catch {
    return { errors: { general: "An error occured. Please retry later." } };
  }
}
