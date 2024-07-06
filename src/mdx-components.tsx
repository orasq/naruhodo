import type { MDXComponents } from 'mdx/types'
import { Paragraph } from './components/Paragraph'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    p: ({children}) => <Paragraph>{children}</Paragraph>,
    ...components,
  }
}