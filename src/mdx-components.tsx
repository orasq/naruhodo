import type { MDXComponents } from "mdx/types";
import { TextBlock } from "./components/TextBlock";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({ children }) => <TextBlock>{children}</TextBlock>,
    ...components,
  };
}
