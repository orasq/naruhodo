import { defineCollection, defineConfig } from "@content-collections/core";

const books = defineCollection({
  name: "books",
  directory: "src/books",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    author: z.string(),
    image: z.string(),
    publishedYear: z.string().optional(),
    synopsis: z.string().optional(),
  }),
});

export default defineConfig({
  collections: [books],
});
