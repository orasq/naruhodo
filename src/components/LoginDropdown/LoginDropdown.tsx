import { useEffect, useState } from "react";
import { Button } from "../Button";
import { ForgotPasswordForm } from "../Form/ForgotPasswordForm";
import { LoginForm } from "../Form/LoginForm";
import { RegisterForm } from "../Form/RegisterForm";
import { Modal } from "../Modal";
import type { LoginDropdownMode } from "./LoginDropdown.types";

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

            {/* Forgot password form */}
            {visibleForm === "forgot-password" && (
              <ForgotPasswordForm setVisibleForm={setVisibleForm} />
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default LoginDropdown;
