import { tv } from "tailwind-variants";

export const toolboxButtonStyle = tv({
  base: [
    "h-toolbox w-toolbox flex shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent",
    "hover:bg-orange-0",
  ],
  variants: {
    disabled: {
      true: "cursor-not-allowed opacity-50",
    },
  },
});

export const toolboxListStyle = tv({
  base: [
    "ease-smooth relative grid duration-1000 motion-safe:transition-[opacity,grid]",
    "after:bg-copy/15 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:opacity-0 after:delay-20 after:duration-1000 motion-safe:after:transition-opacity",
  ],
  variants: {
    state: {
      visible: "grid-rows-[1fr] pb-2 opacity-100 after:opacity-100",
      hidden: "grid-rows-[0fr] opacity-0 after:opacity-0",
    },
  },
});
