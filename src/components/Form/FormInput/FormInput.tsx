import { forwardRef, InputHTMLAttributes } from "react";

type FormInputCustomProps = {
  id: string;
  hasErrors?: string | string[];
};

type FormInputProps = InputHTMLAttributes<HTMLInputElement> &
  FormInputCustomProps;

/**
 * Using forwardRef to be able to use React Hook Form's register() directly on it
 */
const FormInput = forwardRef(
  (
    { id, type = "text", hasErrors, ...rest }: FormInputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    return (
      <input
        ref={ref}
        className={`w-full rounded-md border p-2 ${hasErrors ? "border-error" : "border-surface-strong"}`}
        id={id}
        type={type}
        aria-invalid={hasErrors && hasErrors.length > 0 ? "true" : "false"}
        {...rest}
      />
    );
  },
);

export default FormInput;
