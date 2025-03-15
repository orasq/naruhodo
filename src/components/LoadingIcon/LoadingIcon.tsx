import { loadingIconStyles } from "./LoadingIcon.styles";

type LoadingIconProps = {
  variant?: "dark" | "light";
  size?: "xs" | "sm" | "md" | "lg";
};

function LoadingIcon({ variant = "dark", size = "md" }: LoadingIconProps) {
  return <div className={loadingIconStyles({ variant, size })} />;
}

export default LoadingIcon;
