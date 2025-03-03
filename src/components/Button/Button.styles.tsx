import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "relative flex cursor-pointer items-center justify-center rounded-xl px-5 py-2 text-base",
  variants: {
    variant: {
      dark: "bg-copy text-copy-inverted",
      light: "bg-surface-base text-copy shadow-xs",
      primary: "bg-primary-medium text-white",
      secondary: "bg-secondary-medium text-white",
    },
    isLoading: {
      true: "pointer-events-none",
    },
  },
});
