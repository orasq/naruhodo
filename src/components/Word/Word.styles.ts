import { tv } from "tailwind-variants";

export const wordStyle = tv({
  base: [
    "relative inline rounded-sm",
    "hover:isolate hover:z-20 hover:cursor-pointer hover:bg-surface-light hover:shadow-word",
  ],
  variants: {
    isActive: {
      true: "isolate z-20 cursor-pointer bg-surface-light shadow-word",
    },
    isClosing: {
      true: "z-20 bg-transparent shadow-none hover:shadow-none",
    },
  },
});
