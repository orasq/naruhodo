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
import { FormNotification } from "../FormNotification";

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
          <FormNotification
            type="error"
            message={actionState.errors?.general}
          />
        )}

        {/* Success */}
        {actionState.success && (
          <FormNotification
            type="success"
            message="Your password has successfully been changed."
          />
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
