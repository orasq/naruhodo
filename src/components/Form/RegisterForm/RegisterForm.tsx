import { createUser } from "@/actions/users/createUser";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";
import { Button } from "@/components/Button";

function RegisterForm() {
  return (
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
  );
}

export default RegisterForm;
