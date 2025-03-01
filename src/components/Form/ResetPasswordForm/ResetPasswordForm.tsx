import { Button } from "@/components/Button";
import FormField from "../FormField/FormField";
import { FormInput } from "../FormInput";

function ResetPasswordForm() {
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

      {/* Submit button */}
      <Button type="submit" className="mx-auto">
        Rest my password
      </Button>
    </form>
  );
}

export default ResetPasswordForm;
