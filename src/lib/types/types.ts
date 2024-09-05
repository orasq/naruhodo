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

export type DBWord = {
  id: string;
  content: string;
};

export type DBKanji = {
  id: string;
  text: string;
  word_id: number;
};

export type DBKana = {
  id: string;
  text: string;
  applies_to_kanji: string;
  word_id: number;
};

export type DictionaryEntry = {
  id: string;
  kanji: Array<{ common: boolean; text: string; tags: Array<string> }>;
  kana: Array<{
    common: boolean;
    text: string;
    tags: Array<string>;
    appliesToKanji: Array<string>;
  }>;
  sense: Array<{
    partOfSpeech: Array<string>;
    appliesToKanji: Array<string>;
    appliesToKana: Array<string>;
    related: Array<string>;
    antonym: Array<string>;
    field: Array<string>;
    dialect: Array<string>;
    misc: Array<string>;
    info: Array<string>;
    languageSource: Array<string>;
    gloss: Array<{
      lang: string;
      gender: string | null;
      type: string | null;
      text: string;
    }>;
  }>;
};

export type ParsedWord = {
  text: string;
  dictionaryEntry?: DBWord;
};
