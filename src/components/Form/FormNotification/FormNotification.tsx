import { formNotificationStyle } from "./FormNotification.styles";

type FormNotificationProps = {
  message: string;
  type: "error" | "success";
};

function FormNotification({ type, message }: FormNotificationProps) {
  return <div className={formNotificationStyle({ type })}>{message}</div>;
}

export default FormNotification;
