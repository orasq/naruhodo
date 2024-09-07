import { tagStyle } from "./Tag.styles";

type TagProps = {
  theme?: "primary" | "secondary" | "neutral";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

function Tag({ theme = "primary", size = "sm", children }: TagProps) {
  return <span className={tagStyle({ theme, size })}>{children}</span>;
}

export default Tag;
