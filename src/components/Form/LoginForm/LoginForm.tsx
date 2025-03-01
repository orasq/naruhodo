import { Button } from "@/components/Button";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";

type LoginFormProps = {
  setVisibleForm: (value: "forgot-password") => void;
};

function LoginForm({ setVisibleForm }: LoginFormProps) {
  return (
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
  );
}

export default LoginForm;
