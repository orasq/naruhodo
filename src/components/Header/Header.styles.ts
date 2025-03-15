import { tv } from "tailwind-variants";

export const darkModeIconStyle = tv({
  base: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-200",
  variants: {
    active: {
      true: "opacity-100",
    },
  },
});
