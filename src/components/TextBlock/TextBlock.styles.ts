import { tv } from "tailwind-variants";

export const textBlockStyle = tv({
  base: "relative mb-[3em] scroll-mt-6 duration-1000 ease-out motion-safe:transition-opacity",
  variants: {
    state: {
      visible: "opacity-100",
      hidden: "opacity-50",
    },
  },
});

export const bookmarkZoneStyle = tv({
  base: [
    "motion-safe:background border-copy/40 absolute -inset-3 z-10 rounded-xl border-1 border-dashed duration-100",
    "hover:bg-surface-base/30",
  ],
  variants: {
    isBookmarked: {
      true: "border-copy border-2 border-solid",
    },
  },
});
