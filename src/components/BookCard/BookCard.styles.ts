import { tv } from "tailwind-variants";

export const contentWrapperStyles = tv({
  base: "w-full",
  variants: {
    isFinished: {
      true: "opacity-50 grayscale",
    },
  },
});
