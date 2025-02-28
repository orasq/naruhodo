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
      className="w-full rounded-md border border-gray-300 p-2"
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
