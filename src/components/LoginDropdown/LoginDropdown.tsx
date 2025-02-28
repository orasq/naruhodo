import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import FormField from "../Form/FormField/FormField";
import { FormInput } from "../Form/FormInput";
import { LoginDropdownMode } from "./LoginDropdown.types";

function LoginDropdown() {
  const [isLoginForm, setIsLoginForm] = useState<LoginDropdownMode>("login");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsLoginForm("login");
  }, [isOpen]);

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
            {isLoginForm === "login" && (
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
                  <button
                    className="mt-2 block text-right text-sm underline"
                    onClick={() => setIsLoginForm("forgot-password")}
                  >
                    Forgot password?
                  </button>
                </FormField>

                {/* Submit button */}
                <Button type="submit" className="mx-auto">
                  Log in to your account
                </Button>
              </form>
            )}

            {/* Sign in form */}
            {isLoginForm === "register" && (
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
                    id="password"
                    name="password"
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
            )}

            {/* Sign in form */}
            {isLoginForm === "forgot-password" && (
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
            )}

            {/* Switch to sign in / log in form */}
            <div className="mt-5 border-t pt-4 text-center text-sm">
              {isLoginForm === "login" && (
                <>
                  Don't have an account?{" "}
                  <button
                    className="cursor-pointer underline"
                    onClick={() => setIsLoginForm("register")}
                  >
                    Sign in now
                  </button>
                </>
              )}

              {isLoginForm === "register" && (
                <>
                  Have an account?{" "}
                  <button
                    className="cursor-pointer underline"
                    onClick={() => setIsLoginForm("login")}
                  >
                    Log in here
                  </button>
                </>
              )}

              {isLoginForm === "forgot-password" && (
                <>
                  Remember your password?{" "}
                  <button
                    className="cursor-pointer underline"
                    onClick={() => setIsLoginForm("login")}
                  >
                    Log in here
                  </button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default LoginDropdown;
