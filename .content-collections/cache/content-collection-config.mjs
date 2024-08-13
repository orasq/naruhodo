// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
var books = defineCollection({
  name: "books",
  directory: "src/books",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    author: z.string(),
    image: z.string(),
    publishedYear: z.string().optional(),
    synopsis: z.string().optional()
  })
});
var content_collections_default = defineConfig({
  collections: [books]
});
export {
  content_collections_default as default
};
