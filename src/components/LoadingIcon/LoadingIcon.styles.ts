import { tv } from "tailwind-variants";

export const loadingIconStyles = tv({
  base: "animate-spin rounded-full duration-100",
  variants: {
    size: {
      xs: "h-[12px] w-[12px] border",
      sm: "h-[16px] w-[16px] border-2",
      md: "h-[22px] w-[22px] border-2",
      lg: "h-[32px] w-[32px] border-3",
    },
    variant: {
      dark: "border-copy border-l-copy/10 border-t-copy/10",
      light:
        "border-surface-base border-l-surface-base/10 border-t-surface-base/10",
    },
  },
});
