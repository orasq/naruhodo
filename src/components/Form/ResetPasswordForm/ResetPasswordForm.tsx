"use client";

import { resetPassword } from "@/actions/users/resetPassword";
import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import {
  ResetPasswordFormData,
  resetPasswordValidationSchema,
} from "./ResetPasswordForm.validation";

type ResetPasswordFormProps = {
  token: string;
};

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [actionState, submitAction, isLoading] = useActionState(resetPassword, {
    formData: {
      password: "",
      confirmPassword: "",
      token: "",
    },
    errors: {},
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordValidationSchema),
  });

  const errorMessages = {
    password: errors.password?.message || actionState.errors?.password,
    confirmPassword:
      errors.confirmPassword?.message || actionState.errors?.confirmPassword,
  };

  const onSubmit = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);

    startTransition(() => {
      submitAction(formData);
    });

    resetField("password");
    resetField("confirmPassword");
  };

  return (
    <>
      <form
        ref={formRef}
        action={submitAction}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 text-left"
      >
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

        <input type="hidden" name="token" defaultValue={token} />

        {/* General error */}
        {actionState.errors?.general && (
          <div className="text-error bg-error-subtle border-error rounded-md border p-2 text-center text-sm">
            {actionState.errors?.general}
          </div>
        )}

        {/* Success */}
        {actionState.success && (
          <div className="text-success bg-success-subtle border-success rounded-md border p-2 text-center text-sm">
            Your password has successfully been changed.
          </div>
        )}

        {/* Submit button */}
        <Button type="submit" className="mx-auto mt-8" isLoading={isLoading}>
          Define a new password
        </Button>
      </form>
    </>
  );
}

export default ResetPasswordForm;
