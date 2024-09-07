import { tv } from "tailwind-variants";

export const tagStyle = tv({
  base: "rounded-md px-2 py-1 text-sm text-white",
  variants: {
    theme: {
      primary: "bg-accent-primary",
      secondary: "bg-accent-secondary",
      neutral: "bg-surface-medium text-copy",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});
