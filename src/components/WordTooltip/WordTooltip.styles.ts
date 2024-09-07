import { tv } from "tailwind-variants";

export const tooltipBackgroundStyle = tv({
  base: "pointer-events-none fixed inset-0 h-full w-full bg-backdrop opacity-0 transition-opacity",
  variants: {
    isVisible: {
      true: "pointer-events-auto opacity-50",
    },
    isClosing: {
      true: "opacity-0",
    },
  },
});

export const tooltipPanelStyle = tv({
  base: [
    "relative overflow-clip rounded-t-4xl bg-surface-light shadow-sm transition-[opacity,transform] duration-1000 ease-smooth",
    "sm:rounded-xl",
    "before:absolute before:left-0 before:top-0 before:z-10 before:h-6 before:w-full before:bg-gradient-to-b before:from-surface-light before:to-surface-light/0",
    "after:absolute after:bottom-0 after:left-0 after:h-6 after:w-full after:bg-gradient-to-t after:from-surface-light after:to-surface-light/0",
  ],
  variants: {
    state: {
      visible: [
        "translate-y-0 scale-100 opacity-100",
        "sm:translate-y-0 sm:scale-100",
      ],
      hidden: ["translate-y-3/4 opacity-0", "sm:translate-y-5 sm:scale-95"],
    },
    isClosing: {
      true: ["translate-y-3/4 opacity-0", "sm:translate-y-5 sm:scale-95"],
    },
  },
});

export const tooltipContentWrapperStyle = tv({
  base: [
    "no-scrollbar max-h-96 w-full overflow-auto p-8 text-copy",
    "sm:max-h-72 sm:w-max sm:max-w-sm sm:p-6",
  ],
});
