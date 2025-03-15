import { tv } from "tailwind-variants";

export const tooltipBackgroundStyle = tv({
  base: "bg-backdrop pointer-events-none fixed inset-0 h-full w-full opacity-0 transition-opacity",
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
    "bg-surface-base ease-smooth relative overflow-clip rounded-t-4xl shadow-xs transition-[opacity,transform] duration-1000",
    "sm:rounded-xl",
    "before:from-surface-light before:to-surface-light/0 before:absolute before:top-0 before:left-0 before:z-10 before:h-6 before:w-full before:bg-linear-to-b",
    "after:from-surface-light after:to-surface-light/0 after:absolute after:bottom-0 after:left-0 after:h-6 after:w-full after:bg-linear-to-t",
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
    "no-scrollbar text-copy max-h-96 w-full overflow-auto p-8",
    "sm:max-h-72 sm:w-max sm:max-w-sm sm:p-6",
  ],
});
