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
    "motion-safe:background absolute -inset-3 z-10 rounded-xl border-1 border-dashed border-copy/40 duration-100",
    "hover:bg-surface-light/30",
  ],
  variants: {
    isBookmarked: {
      true: "border-2 border-solid border-copy",
    },
  },
});
