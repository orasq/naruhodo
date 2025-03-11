"use server";

import {
  LoginFormData,
  loginValidationSchema,
} from "@/components/Form/LoginForm/LoginForm.validation";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { verifyHashedPassword } from "@/lib/utils/functions/hashPassword";

type LogUserState = {
  formData?: LoginFormData;
  errors?: {
    email?: string[] | undefined;
    password?: string[] | undefined;
    general?: string;
  };
  success?: boolean;
};

export async function logUser(
  _: LogUserState,
  data: FormData,
): Promise<LogUserState> {
  const formData = Object.fromEntries(data.entries()) as LoginFormData;

  // validate the form data
  const parsedForm = loginValidationSchema.safeParse(formData);

  console.log({ parsedForm });

  if (!parsedForm.success) {
    return {
      formData,
      errors: parsedForm.error.flatten().fieldErrors,
    };
  }

  // get user from the database
  const [user] = await findUserByEmail(parsedForm.data.email);

  if (!user) {
    return {
      formData,
      errors: { general: "Invalid email or password" },
    };
  }

  // check if account has been activated
  if (!user.active) {
    return {
      formData,
      errors: {
        general:
          "Your account has not been activated yet. Please check your mailbox",
      },
    };
  }

  // check if the password is correct
  const passwordMatch = await verifyHashedPassword(
    user.password,
    parsedForm.data.password,
  );

  if (!passwordMatch) {
    return {
      formData,
      errors: { general: "Invalid email or password" },
    };
  }

  return {
    success: true,
  };
}
