import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";

import { logUser } from "@/actions/users/logUser";
import { Button } from "@/components/Button";
import { sleep } from "@/lib/utils/functions/sleep";
import { useRef } from "react";
import { useFormState } from "react-dom";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { LoginFormData, loginValidationSchema } from "./LoginForm.validation";

type LoginFormProps = {
  setVisibleForm: (value: "register" | "forgot-password") => void;
};

function LoginForm({ setVisibleForm }: LoginFormProps) {
  const [actionState, submitAction] = useFormState(logUser, {
    formData: { email: "", password: "" },
    errors: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    resetField,
  } = useForm<LoginFormData>({ resolver: zodResolver(loginValidationSchema) });

  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (_: FieldValues) => {
    if (!formRef.current) return;

    await sleep(1000);

    const formData = new FormData(formRef.current);
    submitAction(formData);

    resetField("password");
  };

  return (
    <>
      <form
        ref={formRef}
        action={submitAction}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* General error */}
        {actionState.errors?.general && (
          <div className="text-error bg-error-subtle border-error rounded-md border p-2 text-sm">
            {actionState.errors?.general}
          </div>
        )}

        {/* Success */}
        {actionState.success && (
          <div className="text-success bg-success-subtle border-success rounded-md border p-2 text-sm">
            Yeeaaaaaah!!!!
          </div>
        )}

        {/* Email field */}
        <FormField
          id="email"
          label="Email"
          errorMessage={errors.email?.message}
        >
          <FormInput
            {...register("email")}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            hasErrors={errors.email?.message}
          />
        </FormField>

        {/* Password field */}
        <FormField
          id="password"
          label="Password"
          errorMessage={errors.password?.message}
        >
          <FormInput
            {...register("password")}
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            placeholder="Password"
            hasErrors={errors.password?.message}
          />
        </FormField>
        <button
          type="button"
          className="mt-2 block cursor-pointer text-right text-sm underline"
          onClick={() => setVisibleForm("forgot-password")}
        >
          Forgot password?
        </button>

        {/* Submit button */}
        <Button type="submit" className="mx-auto" isLoading={isSubmitting}>
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
