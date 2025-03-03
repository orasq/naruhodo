import { Button } from "@/components/Button";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { useState } from "react";

type ResetPasswordFormProps = {
  setVisibleForm: (value: "login") => void;
};

function ResetPasswordForm({ setVisibleForm }: ResetPasswordFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(true);

  return (
    <>
      {!showConfirmation && (
        <>
          <form className="space-y-4">
            {/* Email field */}
            <FormField id="email" label="Email">
              <FormInput
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                required={true}
                placeholder="Email address"
              />
            </FormField>

            {/* Submit button */}
            <Button type="submit" className="mx-auto">
              Rest my password
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
            Password Reset Email Sent
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

export default ResetPasswordForm;
