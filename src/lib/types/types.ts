import { tags } from "../utils/functions/getDictionaryTag";

export type ThemeMode = "light" | "dark";

export type BookFontSize = "sm" | "md" | "lg";

export type TextBlockTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export type BookInfo = {
  title: string;
  author: string;
  image: string;
  publishedYear?: string;
  synopsis?: string;
  _meta?: {
    directory: string;
    fileName: string;
    filePath: string;
    path: string;
  };
};
