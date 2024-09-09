import { KuromojiToken } from "kuromojin";
import { ParsedWord } from "./dictionary.types";

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

export type ParagraphObject = {
  baseText: string;
  tokens: KuromojiToken[];
  parsedText: ParsedWord[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  isBookmarked: boolean;
};

export type WordToken = {
  index: number;
  baseText: string;
  tokens: KuromojiToken[];
};
