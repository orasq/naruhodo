import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { logUser } from "@/actions/users/logUser";
import { Button } from "@/components/Button";
import { startTransition, useActionState, useRef } from "react";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { FormNotification } from "../FormNotification";
import {
  type LoginFormData,
  loginValidationSchema,
} from "./LoginForm.validation";

type LoginFormProps = {
  setVisibleForm: (value: "register" | "forgot-password") => void;
};

function LoginForm({ setVisibleForm }: LoginFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [actionState, submitAction, isLoading] = useActionState(logUser, {
    formData: { email: "", password: "" },
    errors: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginValidationSchema) });

  const errorMessages = {
    email: errors.email?.message || actionState.errors?.email,
    password: errors.password?.message || actionState.errors?.password,
  };

  const onSubmit = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    startTransition(() => {
      submitAction(formData);
    });

    resetField("password");
  };

  return (
    <>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* Email field */}
        <FormField id="email" label="Email" errorMessage={errorMessages.email}>
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
        <button
          type="button"
          className="mt-2 block cursor-pointer text-right text-sm underline"
          onClick={() => setVisibleForm("forgot-password")}
        >
          Forgot password?
        </button>

        {/* General error */}
        {actionState.errors?.general && (
          <FormNotification
            type="error"
            message={actionState.errors?.general}
          />
        )}

        {/* Success */}
        {actionState.success && (
          <FormNotification type="success" message="Successfully logged in" />
        )}

        {/* Submit button */}
        <Button type="submit" className="mx-auto" isLoading={isLoading}>
          Log in to your account
        </Button>
      </form>

      {/* Bottom CTA */}
      <div className="mt-5 border-t pt-4 text-center text-sm">
        Don't have an account?{" "}
        <button
          className="cursor-pointer underline"
          onClick={() => setVisibleForm("register")}
        >
          Sign in now
        </button>
      </div>
    </>
  );
}

export default LoginForm;
