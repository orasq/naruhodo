import { TextBlockTag } from "@/components/TextBlock/TextBlock";

function initializeBaseText(text: string): {
  baseText: string;
  htmlTag: TextBlockTag;
} {
  let baseText = text;
  let htmlTag: TextBlockTag = "p";

  const tagLevels: { prefix: string; tag: TextBlockTag }[] = [
    { prefix: "# ", tag: "h1" },
    { prefix: "## ", tag: "h2" },
    { prefix: "### ", tag: "h3" },
    { prefix: "#### ", tag: "h4" },
    { prefix: "##### ", tag: "h5" },
    { prefix: "###### ", tag: "h6" },
  ];

  for (const { prefix, tag } of tagLevels) {
    if (text.startsWith(prefix)) {
      baseText = text.slice(prefix.length);
      htmlTag = tag;
      break;
    }
  }

  return {
    baseText,
    htmlTag,
  };
}

export default initializeBaseText;
