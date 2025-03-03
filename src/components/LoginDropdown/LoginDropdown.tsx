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
          <div className="bg-surface-base relative min-w-80 overflow-hidden rounded-xl p-5 shadow-sm">
            <Modal.Title className="sr-only">
              {visibleForm ? "Connect to your account" : "Create an account"}
            </Modal.Title>

            {/* Login form */}
            {visibleForm === "login" && (
              <LoginForm setVisibleForm={setVisibleForm} />
            )}

            {/* Sign in form */}
            {visibleForm === "register" && (
              <RegisterForm setVisibleForm={setVisibleForm} />
            )}

            {/* Reset password form */}
            {visibleForm === "forgot-password" && (
              <ResetPasswordForm setVisibleForm={setVisibleForm} />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default LoginDropdown;
