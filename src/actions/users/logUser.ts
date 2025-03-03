"use server";

import {
  LoginFormData,
  loginValidationSchema,
} from "@/components/Form/LoginForm/LoginForm.validation";
import findUserByEmail from "@/db/utils/functions/findUserByEmail";
import { verifyHashedPassword } from "@/lib/utils/functions/hashPassword";

export async function logUser(formData: FormData) {
  const form = Object.fromEntries(formData.entries()) as LoginFormData;

  // validate the form data
  const parsedForm = loginValidationSchema.safeParse(form);

  if (!parsedForm.success) {
    return {
      formData: form,
      errors: parsedForm.error.flatten().fieldErrors,
    };
  }

  // get user from the database
  const [user] = await findUserByEmail(parsedForm.data.email);

  if (!user) {
    return {
      formData: form,
      errors: "Invalid email or password",
    };
  }

  // check if the password is correct
  const passwordMatch = await verifyHashedPassword(
    user.password,
    parsedForm.data.password,
  );

  if (!passwordMatch) {
    return {
      formData: form,
      errors: "Invalid email or password",
    };
  }

  console.log({ passwordMatch });
}
