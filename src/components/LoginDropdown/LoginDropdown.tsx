import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Modal } from "../Modal";
import FormField from "../Form/FormField/FormField";
import { FormInput } from "../Form/FormInput";
import type { LoginDropdownMode } from "./LoginDropdown.types";
import { createUser } from "@/actions/users/createUser";
import { RegisterForm } from "../Form/RegisterForm";
import { LoginForm } from "../Form/LoginForm";
import { ResetPasswordForm } from "../Form/ResetPasswordForm";

function LoginDropdown() {
  const [visibleForm, setVisibleForm] = useState<LoginDropdownMode>("login");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) setVisibleForm("login");
  }, [isOpen]);

  const buttonLabel = () => {
    switch (visibleForm) {
      case "login":
        return "Log in";
      case "register":
        return "Sign in";
      case "forgot-password":
        return "Forgot password?";

      default:
        return "Log in";
    }
  };

  return (
    <div className="relative">
      <Button
        className={isOpen ? "relative isolate z-20" : ""}
        onClick={() => setIsOpen(!isOpen)}
      >
        {buttonLabel()}
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
              {visibleForm ? "Connect to your account" : "Create an account"}
            </Modal.Title>

            {/* Login form */}
            {visibleForm === "login" && (
              <LoginForm setVisibleForm={setVisibleForm} />
            )}

            {/* Sign in form */}
            {visibleForm === "register" && <RegisterForm />}

            {/* Reset password form */}
            {visibleForm === "forgot-password" && <ResetPasswordForm />}

            {/* Switch to sign in / log in form */}
            <div className="mt-5 border-t pt-4 text-center text-sm">
              {visibleForm === "login" && (
                <>
                  Don't have an account?{" "}
                  <button
                    className="cursor-pointer underline"
                    onClick={() => setVisibleForm("register")}
                  >
                    Sign in now
                  </button>
                </>
              )}

              {visibleForm === "register" && (
                <>
                  Have an account?{" "}
                  <button
                    className="cursor-pointer underline"
                    onClick={() => setVisibleForm("login")}
                  >
                    Log in here
                  </button>
                </>
              )}

              {visibleForm === "forgot-password" && (
                <>
                  Remember your password?{" "}
                  <button
                    className="cursor-pointer underline"
                    onClick={() => setVisibleForm("login")}
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
