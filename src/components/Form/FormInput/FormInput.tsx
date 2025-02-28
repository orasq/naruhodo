type FormInputProps = {
  id: string;
  name: string;
  placeholder: string;
  type?: "text" | "email" | "password";
  required?: boolean;
  autocomplete?: string;
};

function FormInput({
  id,
  name,
  placeholder,
  type = "text",
  required,
  autocomplete,
}: FormInputProps) {
  return (
    <input
      className="border-surface-strong w-full rounded-md border p-2"
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      required={required}
      autoComplete={autocomplete}
    />
  );
}

export default FormInput;
