import Link, { LinkProps } from "next/link";
import { buttonStyles } from "./Button.styles";

type ButtonBaseProps = {
  variant?: "primary" | "secondary";
  ariaLabel?: string;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLinkProps = ButtonBaseProps &
  LinkProps & {
    as: "a";
  };

type ButtonAsButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

function Button(props: ButtonProps) {
  if (props.as === "a") {
    // to avoid passing `as` to the <a> element causing bug with href
    const { as, ...rest } = props;

    return (
      <Link
        {...rest}
        className={buttonStyles({
          variant: props.variant,
          class: props.className,
        })}
      />
    );
  }

  return (
    <button
      {...props}
      className={buttonStyles({
        variant: props.variant,
        class: props.className,
      })}
    />
  );
}

export default Button;
