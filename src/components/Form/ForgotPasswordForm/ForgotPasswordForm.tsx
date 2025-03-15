import { startTransition, useActionState, useRef } from "react";
import { useForm } from "react-hook-form";
import { forgotPassword } from "@/actions/users/forgotPassword";
import { Button } from "@/components/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import {
  ForgotPasswordFormData,
  forgotPasswordValidationSchema,
} from "./ForgotPasswordForm.validation";

type ForgotPasswordFormProps = {
  setVisibleForm: (value: "login") => void;
};

function ForgotPasswordForm({ setVisibleForm }: ForgotPasswordFormProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [actionState, submitAction, isLoading] = useActionState(
    forgotPassword,
    {
      formData: {
        email: "",
      },
      errors: {},
    },
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordValidationSchema),
  });

  const errorMessages = errors.email?.message || actionState.errors?.email;

  const onSubmit = async () => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    startTransition(() => {
      submitAction(formData);
    });

    resetField("email");
  };

  return (
    <>
      {!actionState.success && (
        <>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            {/* Email field */}
            <FormField id="email" label="Email" errorMessage={errorMessages}>
              <FormInput
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required={true}
                placeholder="Email address"
                hasErrors={errorMessages}
              />
            </FormField>

            {/* Submit button */}
            <Button type="submit" className="mx-auto" isLoading={isLoading}>
              Reset my password
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
      {actionState.success && (
        <div className="text-center text-sm">
          <h3 className="mb-3 text-lg font-semibold">
            Password reset email sent
          </h3>
          <p>
            A password reset link has been sent to your email address.{" "}
            <strong>Please check your inbox</strong> and follow the instructions
            to reset your password.
          </p>

          {/* Bottom CTA */}
          <div className="mt-5 border-t pt-4 text-center">
            Already reset your password?{" "}
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

export default ForgotPasswordForm;
