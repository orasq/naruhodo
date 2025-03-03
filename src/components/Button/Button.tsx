import Link, { LinkProps } from "next/link";
import { buttonStyles } from "./Button.styles";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

type ButtonBaseProps = {
  variant?: "dark" | "light" | "primary" | "secondary";
  ariaLabel?: string;
  isLoading?: boolean;
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

function Button({
  as,
  variant,
  ariaLabel,
  isLoading,
  className,
  children,
  ...rest
}: ButtonProps) {
  const buttonVariant = variant ?? "dark";

  if (as === "a") {
    return (
      <Link
        {...(rest as LinkProps)}
        className={buttonStyles({
          variant: buttonVariant,
          class: className,
        })}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      className={buttonStyles({
        variant: buttonVariant,
        isLoading: isLoading,
        class: className,
      })}
    >
      {/* Button text */}
      <span className={isLoading ? "opacity-0" : ""}>{children}</span>

      {/* Loading icon */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingIcon
            variant={buttonVariant === "light" ? "dark" : "light"}
            size="sm"
          />
        </div>
      )}
    </button>
  );
}

export default Button;
