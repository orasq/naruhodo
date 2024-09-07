import { tv } from "tailwind-variants";

type TagProps = {
  theme?: "primary" | "secondary" | "neutral";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

const tagStyle = tv({
  base: "rounded-md px-2 py-1 text-sm text-white",
  variants: {
    theme: {
      primary: "bg-accent-primary",
      secondary: "bg-accent-secondary",
      neutral: "bg-surface-medium text-copy",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
    },
  },
});

function Tag({ theme = "primary", size = "sm", children }: TagProps) {
  return <span className={tagStyle({ theme, size })}>{children}</span>;
}

export default Tag;
