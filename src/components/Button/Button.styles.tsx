import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "bg-copy transition- text-surface-light flex cursor-pointer items-center justify-center rounded-xl px-5 py-2 text-base",
  variants: {
    variant: {
      white: "bg-surface-light text-copy shadow-xs",
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-800",
    },
  },
});
