import { tv } from "tailwind-variants";

export const toolboxButtonStyle = tv({
  base: [
    "flex h-toolbox w-toolbox shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-transparent",
    "hover:bg-orange-0",
  ],
});

export const toolboxListStyle = tv({
  base: [
    "relative grid duration-1000 ease-smooth motion-safe:transition-[opacity,grid]",
    "after:delay-20 after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:bg-copy/15 after:opacity-0 after:duration-1000 after:motion-safe:transition-opacity",
  ],
  variants: {
    state: {
      visible: "grid-rows-[1fr] pb-2 opacity-100 after:opacity-100",
      hidden: "grid-rows-[0fr] opacity-0 after:opacity-0",
    },
  },
});
