import { tv } from "tailwind-variants";

export const buttonStyles = tv({
  base: "bg-copy transition- flex items-center justify-center rounded-xl p-1 px-4 py-2 text-white",
  variants: {
    variant: {
      white: "bg-surface-light text-black shadow-xs",
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-800",
    },
  },
});
