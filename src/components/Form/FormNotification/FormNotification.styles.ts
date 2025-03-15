import { tv } from "tailwind-variants";

export const formNotificationStyle = tv({
  base: "rounded-md border p-2 text-center text-sm",
  variants: {
    type: {
      error: "text-error bg-error-subtle border-error",
      success: "text-success bg-success-subtle border-success",
    },
  },
});
