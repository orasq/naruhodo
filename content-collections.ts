import { defineCollection, defineConfig } from "@content-collections/core";

const books = defineCollection({
  name: "books",
  directory: "src/books",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    author: z.string(),
    publishedYear: z.string().optional(),
    image: z.string(),
  }),
});

export default defineConfig({
  collections: [books],
});
