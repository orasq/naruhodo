import { createUser } from "@/actions/users/createUser";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { Button } from "@/components/Button";
import { useState } from "react";

type RegisterFormProps = {
  setVisibleForm: (value: "login") => void;
};

function RegisterForm({ setVisibleForm }: RegisterFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <>
      {!showConfirmation && (
        <>
          <form className="space-y-4" action={createUser}>
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

            {/* Password field */}
            <FormField id="password" label="Password">
              <FormInput
                id="password"
                name="password"
                type="password"
                autocomplete="password"
                required={true}
                placeholder="Password"
              />
            </FormField>

            {/* Confirm password field */}
            <FormField id="password" label="Confirm password">
              <FormInput
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autocomplete="password"
                required={true}
                placeholder="Password"
              />
            </FormField>

            {/* Submit button */}
            <Button type="submit" className="mx-auto">
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
