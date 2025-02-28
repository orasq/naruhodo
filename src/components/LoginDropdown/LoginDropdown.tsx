import { useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import FormField from "../Form/FormField/FormField";
import { FormInput } from "../Form/FormInput";

function LoginDropdown() {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        className={isOpen ? "relative isolate z-20" : ""}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isLoginForm ? "Log in" : "Sign in"}
      </Button>

      {isOpen && (
        <Modal
          className="absolute top-[calc(100%+10px)] right-0"
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        >
          {/* Backdrop */}
          <Modal.Backdrop />

          {/* Panel */}
          <div className="bg-surface-base min-w-80 rounded-xl p-5 shadow-sm">
            <Modal.Title className="sr-only">
              {isLoginForm ? "Connect to your account" : "Create an account"}
            </Modal.Title>

            {/* Login form */}
            <form className="space-y-4">
              {/* Email field */}
              <FormField id="email" label="Email">
                <FormInput
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required={true}
                  placeholder="Please enter your email address"
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
                  placeholder="Please enter your password address"
                />
                <a
                  href="/coucou"
                  className="mt-2 block text-right text-sm underline"
                >
                  Forgot password?
                </a>
              </FormField>

              {/* Submit button */}
              <Button type="submit" className="mx-auto">
                Log in to your account
              </Button>
            </form>

            {/* Switch to register form */}
            <div className="mt-5 border-t pt-4 text-center text-sm">
              Don't have an account?{" "}
              <a href="/coucou" className="underline">
                Sign up now
              </a>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default LoginDropdown;
