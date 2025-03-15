type FormFieldProps = {
  id: string;
  label: string;
  errorMessage?: string | string[];
  children: React.ReactNode;
};

function FormField({ id, label, errorMessage, children }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold">
        {label}
      </label>

      <div>{children}</div>

      {errorMessage && (
        <div role="alert" className="text-error mt-2 text-xs">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default FormField;
