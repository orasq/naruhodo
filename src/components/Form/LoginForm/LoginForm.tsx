import { Button } from "@/components/Button";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { logUser } from "@/actions/users/logUser";

type LoginFormProps = {
  setVisibleForm: (value: "register" | "forgot-password") => void;
};

function LoginForm({ setVisibleForm }: LoginFormProps) {
  return (
    <>
      <form className="space-y-4" action={logUser}>
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
            type="button"
            className="mt-2 block cursor-pointer text-right text-sm underline"
            onClick={() => setVisibleForm("forgot-password")}
          >
            Forgot password?
          </button>
        </FormField>

        {/* Submit button */}
        <Button type="submit" className="mx-auto">
          Log in to your account
        </Button>
      </form>

      {/* Bottom CTA */}
      <div className="mt-5 border-t pt-4 text-center text-sm">
        Don't have an account?{" "}
        <button
          className="cursor-pointer underline"
          onClick={() => setVisibleForm("register")}
        >
          Sign in now
        </button>
      </div>
    </>
  );
}

export default LoginForm;
