import { tv } from "tailwind-variants";

export const wordStyle = tv({
  base: [
    "relative inline rounded-xs",
    "hover:bg-surface-base hover:shadow-word hover:isolate hover:z-20 hover:cursor-pointer",
  ],
  variants: {
    isActive: {
      true: "bg-surface-base shadow-word isolate z-20 cursor-pointer",
    },
    isClosing: {
      true: "z-20 bg-transparent shadow-none hover:shadow-none",
    },
  },
});
