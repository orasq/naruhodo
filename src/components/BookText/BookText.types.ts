import { ParsedWord } from "@/lib/types/dictionary.types";
import { TextBlockTag } from "@/lib/types/types";

export type ParagraphObject = {
  baseText: string;
  parsedText: ParsedWord[];
  htmlTag: TextBlockTag;
  isVisible: boolean;
  isBookmarked: boolean;
};
