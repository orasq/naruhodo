import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createUser } from "@/actions/users/createUser";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { Button } from "@/components/Button";
import {
  type RegisterFormData,
  registerValidationSchema,
} from "./RegisterForm.validation";
import { useFormState } from "react-dom";
import { sleep } from "@/lib/utils/functions/sleep";

type RegisterFormProps = {
  setVisibleForm: (value: "login") => void;
};

function RegisterForm({ setVisibleForm }: RegisterFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [actionState, submitAction] = useFormState(createUser, {
    formData: { email: "", password: "", confirmPassword: "" },
    errors: {},
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerValidationSchema),
  });

  const errorMessages = {
    email: errors.email?.message || actionState.errors?.email,
    password: errors.password?.message || actionState.errors?.password,
    confirmPassword:
      errors.confirmPassword?.message || actionState.errors?.confirmPassword,
  };

  const onSubmit = async () => {
    if (!formRef.current) return;

    await sleep(500);

    const formData = new FormData(formRef.current);
    submitAction(formData);
  };

  return (
    <>
      {!showConfirmation && (
        <>
          <form
            ref={formRef}
            className="space-y-4"
            action={submitAction}
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email field */}
            <FormField
              id="email"
              label="Email"
              errorMessage={errorMessages.email}
            >
              <FormInput
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                hasErrors={errorMessages.email}
              />
            </FormField>

            {/* Password field */}
            <FormField
              id="password"
              label="Password"
              errorMessage={errorMessages.password}
            >
              <FormInput
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="password"
                placeholder="Password"
                hasErrors={errorMessages.password}
              />
            </FormField>

            {/* Confirm password field */}
            <FormField
              id="password"
              label="Confirm password"
              errorMessage={errorMessages.confirmPassword}
            >
              <FormInput
                {...register("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="password"
                placeholder="Password"
                hasErrors={errorMessages.confirmPassword}
              />
            </FormField>

            {/* Submit button */}
            <Button type="submit" className="mx-auto" isLoading={isSubmitting}>
              Create an account
            </Button>
          </form>

          {/* Bottom CTA */}
          <div className="mt-5 border-t pt-4 text-center text-sm">
            Have an account?{" "}
            <button
              className="cursor-pointer underline"
              onClick={() => setVisibleForm("login")}
            >
              Log in here
            </button>
          </div>
        </>
      )}

      {/* Confirmation */}
      {showConfirmation && (
        <div className="text-center text-sm">
          <h3 className="mb-3 text-lg font-semibold">
            Registration successful!
          </h3>
          <p>
            A confirmation email has been sent to your address.{" "}
            <strong>Please check your inbox</strong> and follow the instructions
            to verify your email.
          </p>

          {/* Bottom CTA */}
          <div className="mt-5 border-t pt-4 text-center">
            Already verified?{" "}
            <button
              className="cursor-pointer underline"
              onClick={() => setVisibleForm("login")}
            >
              Log in here
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisterForm;
